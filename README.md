# Guy Green's Domain App

A personal portfolio and CV website built with React and TypeScript. The site brings together my professional experience, interests, social profiles, and recent chess games.

## What's included

- A homepage with a short introduction and overview of my interests
- An About Me page with a personal profile and photo gallery
- A CV page with a concise web résumé, downloadable PDF, and optional preview
- A chess page that retrieves recent games from Lichess
- Links to my GitHub, LinkedIn, and Instagram profiles
- Responsive light and dark colour schemes

## Tech stack

- React 18
- TypeScript
- React Router
- Tailwind CSS
- Axios
- React Icons
- Vite
- Vitest and Testing Library

## Getting started

### Prerequisites

- Node.js 22.22.2 or newer
- Yarn

### Installation

Clone the repository and install its dependencies:

```bash
git clone git@github.com:guyAOgreen/DomainApp.git
cd DomainApp
yarn install
```

Start the local development server:

```bash
yarn dev
```

The site will be available at [http://localhost:5173](http://localhost:5173).

## Available scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Run the Vite development server. |
| `yarn test` | Run the Vitest suite once. |
| `yarn test:watch` | Run Vitest in watch mode. |
| `yarn build` | Type-check and create an optimized production build in `dist/`. |
| `yarn preview` | Preview the production build locally. |
| `yarn prettify` | Check the repository's Prettier formatting. |
| `yarn prettify:fix` | Apply Prettier formatting. |

## Project structure

```text
src/
├── assets/       Images and GIFs
├── components/   Shared navigation, social, loading, and tab components
├── constants/    Shared application constants
├── hooks/        Remote gallery loading state
├── pages/        Home, About Me, CV, and Chess routes
└── utils/        Gallery validation and Lichess game utilities
```

## External data

The chess page requests recent public games from the [Lichess API](https://lichess.org/api). If the API is unavailable, that page may not be able to display recent games.

### Updating the CV

The CV page presents the web résumé first. The optional PDF preview is collapsed initially and
only loads the document when opened. Above the résumé, visitors can open the PDF in a new tab or
follow a link that opens the on-page preview. An additional fallback link remains inside the preview.

The viewer and PDF links use the public OCI URL in `src/constants/assetConstants.ts`.
The browser opens the PDF directly; visitors save it with their browser's download or share controls.
The URL is public and contains no OCI credentials or pre-authenticated request token.

To update the CV, first save the current PDF outside the repository as a rollback copy. In OCI,
select the Johannesburg bucket `domainapp-public-assets` (namespace `ax1xpn4rr6se`, compartment
`MyDomain`) and upload the new `GuyGreenCV.pdf` with the `cv/` prefix from the bucket root.
Confirm the overwrite using Standard storage and these response headers:

| Header | Value |
| --- | --- |
| `Content-Type` | `application/pdf` (verify the type assigned by the Console after upload) |
| `Cache-Control` | `public, max-age=300, must-revalidate` |
| `Content-Disposition` | `inline; filename="GuyGreenCV.pdf"` |

Keep the same object name and reapply the headers on every upload. Verify the public PDF opens
and compare its content with the site's HTML CV and biographical pages. The cache policy allows
up to five minutes of cached content before a subsequent request revalidates; an already-open
viewer or saved copy does not refresh itself. Replacing the object needs no application build
or deployment. To roll back, re-upload the saved PDF at the same key with the same headers and
verify it again; the same cache window applies.

### Updating the gallery and profile picture

The About Me album loads `about-me/gallery.json` from the same public bucket. The header uses
`about-me/images/profile.jpg` directly, so replacing that object updates the header and its
gallery entry. Both URLs are configured in `src/constants/assetConstants.ts`.
If the portrait cannot load, decorative “GG” initials appear beside the name.

The manifest is a JSON object with an ordered `images` array. Each entry requires non-empty
strings for `src`, `alt`, and `caption`; `label` is an optional non-empty string displayed above
the caption. For example:

```json
{
  "images": [
    {
      "src": "about-me/images/1.jpeg",
      "alt": "Guy on a beach at sunset with mountains in the distance",
      "caption": "Sunset on the Cape Town coast."
    }
  ]
}
```

Use bucket-relative object paths as shown, or full HTTPS URLs within the configured bucket
(as in the initial uploaded manifest). URLs must be unique and cannot contain credentials,
query strings, fragments, or paths that escape the bucket. Encoded path separators and ambiguous
path segments are rejected. Keep existing descriptions accurate when replacing photos; captions,
labels, and alt text are rendered as plain text. An empty array displays an empty-gallery message.
Invalid JSON, invalid entries, and failed requests display an error with a retry button; the
biographical text remains available. Requests have a 15-second deadline, including reading the
response body, so stalled requests also offer a retry. Validation rejects the whole manifest if
any entry is invalid.

To publish changes, save the current manifest and affected images outside the repository for
rollback. Upload new photos first, then overwrite `gallery.json` using the `about-me/` prefix
from the bucket root. Preserve the complete array, changing its order and descriptions as needed.
Use Standard storage, `Content-Type: application/json` for the manifest, the matching image type
(`image/jpeg` for the current photos), and `Cache-Control: public, max-age=300, must-revalidate`
on every upload. Keep the manifest readable by browser requests from the website through CORS.

The browser cache can serve each object for up to five minutes before the next request
revalidates it. The manifest is requested each time the About Me page mounts; an already-open
page does not poll for updates. Reload to request updated images, including the header portrait.
For coordinated image-and-caption updates, upload the image under a new filename, then change
its manifest entry; keep the previous image available for cached manifests and rollback. Keep
`about-me/images/profile.jpg` as the stable header object name. To roll back, restore the saved
objects and manifest with the same headers. None of these content updates needs an app build or
deployment. Verify the gallery controls and header after the next load and cache revalidation.

## Deployment

Run `yarn build` and deploy the generated `dist/` directory to a static host. The host must
serve `index.html` as the fallback for unknown paths so React Router routes can be loaded directly.

Production deployments use the manually triggered `Deploy production` GitHub Actions workflow.
The workflow accepts an optional commit SHA, verifies that it is reachable from `main`, runs the
normal checks, and deploys that exact build artifact through the protected `production`
environment.

The environment requires these secrets:

| Secret | Purpose |
| --- | --- |
| `DEPLOY_HOST` | Production server hostname or address |
| `DEPLOY_USER` | Restricted SSH deployment account |
| `DEPLOY_SSH_KEY` | Private key for the deployment account |
| `DEPLOY_KNOWN_HOSTS` | Trusted SSH host-key entry |

It also requires these variables:

| Variable | Purpose |
| --- | --- |
| `DEPLOY_ROOT` | Absolute deployment root, such as `/srv/domainapp` |
| `PRODUCTION_URL` | HTTPS production origin used for health checks |
| `DEPLOY_PORT` | SSH port; optional and defaults to `22` |

The server must have a pre-existing `releases/` directory beneath `DEPLOY_ROOT` and a `current`
symlink pointing to a valid release. NGINX serves the `current` symlink. Deployments create an
immutable commit-named release, switch `current` atomically, health-check the public production
URL, and restore the previous release if that check fails. The active and immediately previous
successful releases are retained.

## License

No license has been added to this repository. All rights are reserved unless a license is added later.
