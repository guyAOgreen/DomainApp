import { pathToFileURL } from "node:url";

export async function verifyDeploymentCi({ repository, sha, token, request = fetch }) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? "") || !/^[a-f0-9]{40}$/.test(sha ?? "") || !token) {
    throw new Error("A repository, full commit SHA, and GitHub token are required.");
  }

  const api = async (path) => {
    const response = await request(`https://api.github.com/repos/${repository}/actions/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) throw new Error(`GitHub API request failed (${response.status}).`);
    return response.json();
  };

  // Do not filter by success: a previous green run must not hide a newer failed or pending run.
  const { workflow_runs: runs } = await api(
    `workflows/ci.yml/runs?head_sha=${sha}&branch=main&event=push&per_page=1`
  );
  const run = runs[0];
  if (!run) throw new Error(`No CI run on main exists for ${sha}.`);
  if (
    run.head_sha !== sha ||
    run.head_branch !== "main" ||
    run.event !== "push" ||
    run.status !== "completed" ||
    run.conclusion !== "success"
  ) {
    throw new Error(
      `Latest CI run for ${sha} must have completed successfully. Retry after CI passes.`
    );
  }

  const jobs = [];
  for (let page = 1; ; page++) {
    // 'latest' includes successful jobs retained when only failed jobs were rerun.
    const result = await api(`runs/${run.id}/jobs?filter=latest&per_page=100&page=${page}`);
    jobs.push(...result.jobs);
    if (jobs.length >= result.total_count) break;
    if (result.jobs.length === 0) throw new Error("GitHub returned an incomplete CI job list.");
  }
  for (const name of ["verify", "Browser journeys and accessibility"]) {
    const matching = jobs.filter((job) => job.name === name);
    if (
      matching.length !== 1 ||
      matching[0].status !== "completed" ||
      matching[0].conclusion !== "success"
    ) {
      throw new Error(`Required CI job '${name}' did not pass for ${sha}.`);
    }
  }

  const current = await api(`runs/${run.id}`);
  if (
    current.run_attempt !== run.run_attempt ||
    current.status !== "completed" ||
    current.conclusion !== "success"
  ) {
    throw new Error("CI run changed while checking its jobs. Retry after CI passes.");
  }
  return run.id;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    const id = await verifyDeploymentCi({
      repository: process.env.GITHUB_REPOSITORY,
      sha: process.env.DEPLOY_COMMIT,
      token: process.env.GH_TOKEN,
    });
    console.log(`CI run ${id} passed both required jobs for ${process.env.DEPLOY_COMMIT}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
