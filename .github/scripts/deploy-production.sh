#!/usr/bin/env bash

set -Eeuo pipefail

if [[ $# -ne 4 ]]; then
  echo "Usage: deploy-production.sh DEPLOY_ROOT COMMIT ARCHIVE PRODUCTION_URL" >&2
  exit 2
fi

deploy_root="$(realpath -m -- "$1")"
commit="$2"
archive="$(realpath -m -- "$3")"
production_url="${4%/}"

if [[ ! "$deploy_root" =~ ^/[[:alnum:]_.-]+(/[[:alnum:]_.-]+)*$ ]]; then
  echo "Deployment root must be a normalized absolute path." >&2
  exit 2
fi

if [[ "$archive" != "$deploy_root"/.upload-*.tar.gz ]]; then
  echo "Deployment archive is outside the expected upload path." >&2
  exit 2
fi

release_root="$deploy_root/releases"
new_release=""
current_link="$deploy_root/current"
next_link="$deploy_root/.current-next"
rollback_link="$deploy_root/.current-rollback"
activated=false
created_release=false

cleanup() {
  rm -f -- "$archive" "$next_link" "$rollback_link"

  if [[ \
    -n "$new_release" && \
    "$created_release" == true && \
    "$activated" == false && \
    -d "$new_release" \
  ]]; then
    rm -rf -- "$new_release"
  fi
}

trap cleanup EXIT

if [[ ! "$commit" =~ ^[0-9a-f]{40}$ ]]; then
  echo "Deployment commit must be a full lowercase SHA." >&2
  exit 2
fi

if [[ ! "$production_url" =~ ^https://[[:alnum:].-]+(:[0-9]{1,5})?$ ]]; then
  echo "Production URL must be an HTTPS origin without a path." >&2
  exit 2
fi

new_release="$release_root/$commit"

if [[ ! -d "$release_root" || ! -L "$current_link" ]]; then
  echo "Deployment root has not been prepared for atomic releases." >&2
  exit 1
fi

if [[ ! -f "$archive" ]]; then
  echo "Uploaded deployment archive was not found." >&2
  exit 1
fi

if [[ -e "$new_release" ]]; then
  echo "Release already exists and will not be overwritten: $new_release" >&2
  exit 1
fi

previous_release="$(readlink -f -- "$current_link")"

if [[ ! -d "$previous_release" || "$previous_release" != "$release_root"/* ]]; then
  echo "Current symlink does not point to a valid release." >&2
  exit 1
fi

echo "Deploying commit: $commit"
echo "New release: $new_release"
echo "Previous release: $previous_release"

install -d -m 0755 "$new_release"
created_release=true
tar -xzf "$archive" -C "$new_release"
find "$new_release" -type d -exec chmod 0755 {} +
find "$new_release" -type f -exec chmod 0644 {} +

if [[ ! -f "$new_release/index.html" ]]; then
  echo "Staged release does not contain index.html." >&2
  exit 1
fi

rm -f -- "$next_link"
ln -s "releases/$commit" "$next_link"
mv -Tf -- "$next_link" "$current_link"
activated=true

echo "Activated release: $(readlink -f -- "$current_link")"
echo "Running production health check: $production_url"

if ! curl \
  --fail \
  --silent \
  --show-error \
  --retry 3 \
  --retry-connrefused \
  --retry-delay 2 \
  --connect-timeout 10 \
  --max-time 30 \
  "$production_url/?deployment=$commit" \
  > /dev/null; then
  echo "Production health check failed; attempting to restore $previous_release." >&2

  if rm -f -- "$rollback_link" && \
    ln -s "$previous_release" "$rollback_link" && \
    mv -Tf -- "$rollback_link" "$current_link"; then
    activated=false
    echo "Rollback restored release: $previous_release" >&2

    if curl \
      --fail \
      --silent \
      --show-error \
      --connect-timeout 10 \
      --max-time 30 \
      "$production_url/?rollback=${previous_release##*/}" \
      > /dev/null; then
      echo "Rollback health check passed: $previous_release" >&2
    else
      echo "Rollback health check failed: $previous_release" >&2
    fi
  else
    echo "Rollback failed; active release remains $(readlink -f -- "$current_link")." >&2
  fi

  exit 1
fi

echo "Production health check passed for commit: $commit"

active_release="$(readlink -f -- "$current_link")"
shopt -s nullglob

for candidate in "$release_root"/*; do
  if [[ ! -d "$candidate" || -L "$candidate" ]]; then
    continue
  fi

  if [[ "$candidate" == "$active_release" || "$candidate" == "$previous_release" ]]; then
    continue
  fi

  candidate_name="${candidate##*/}"

  if [[ ! "$candidate_name" =~ ^(legacy-cra-[0-9]{8}|[0-9a-f]{40})$ ]]; then
    echo "Skipping unrecognized release directory: $candidate"
    continue
  fi

  echo "Removing expired release: $candidate"
  rm -rf -- "$candidate"
done

echo "Deployment completed successfully: $commit"
