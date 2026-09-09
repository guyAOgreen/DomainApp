import assert from "node:assert/strict";
import { test } from "node:test";
import { verifyDeploymentCi } from "./verify-deployment-ci.mjs";

const sha = "a".repeat(40);
const run = {
  id: 123,
  run_attempt: 2,
  head_sha: sha,
  head_branch: "main",
  event: "push",
  status: "completed",
  conclusion: "success",
};
const jobs = ["verify", "Browser journeys and accessibility"].map((name) => ({
  name,
  status: "completed",
  conclusion: "success",
}));

const check = (responses) => {
  const requested = [];
  return {
    requested,
    result: verifyDeploymentCi({
      repository: "owner/portfolio",
      sha,
      token: "test-token",
      request: async (url) => {
        requested.push(new URL(url));
        assert.ok(responses.length > 0, "Unexpected API request");
        const response = responses.shift();
        return response instanceof Response ? response : Response.json(response);
      },
    }),
  };
};

test("accepts successful CI for the exact main commit, including a rollback", async () => {
  const { requested, result } = check([{ workflow_runs: [run] }, { total_count: 2, jobs }, run]);
  assert.equal(await result, 123);
  assert.equal(requested[0].pathname, "/repos/owner/portfolio/actions/workflows/ci.yml/runs");
  assert.equal(requested[0].searchParams.get("head_sha"), sha);
  assert.equal(requested[0].searchParams.get("event"), "push");
  assert.equal(requested[0].searchParams.get("branch"), "main");
  assert.equal(requested[1].searchParams.get("filter"), "latest");
});

test("rejects a commit with no CI run", async () => {
  await assert.rejects(check([{ workflow_runs: [] }]).result, /No CI run/);
});

for (const change of [
  { status: "in_progress", conclusion: null },
  { conclusion: "failure" },
  { conclusion: "cancelled" },
  { head_sha: "b".repeat(40) },
  { head_branch: "feature" },
  { event: "pull_request" },
]) {
  test(`rejects a latest run with ${JSON.stringify(change)}`, async () => {
    await assert.rejects(
      check([{ workflow_runs: [{ ...run, ...change }, run] }]).result,
      /Latest CI run/
    );
  });
}

for (const invalidJobs of [
  jobs.slice(0, 1),
  [jobs[0], { ...jobs[1], conclusion: "skipped" }],
  [jobs[0], { ...jobs[1], conclusion: "failure" }],
  [jobs[0], { ...jobs[1], status: "in_progress", conclusion: null }],
]) {
  test(`rejects missing or unsuccessful browser checks: ${JSON.stringify(invalidJobs)}`, async () => {
    await assert.rejects(
      check([{ workflow_runs: [run] }, { total_count: invalidJobs.length, jobs: invalidJobs }])
        .result,
      /Required CI job/
    );
  });
}

test("reads subsequent job pages", async () => {
  const filler = Array.from({ length: 99 }, () => ({ name: "unrelated" }));
  const { requested, result } = check([
    { workflow_runs: [run] },
    { total_count: 101, jobs: [jobs[0], ...filler] },
    { total_count: 101, jobs: [jobs[1]] },
    run,
  ]);
  await result;
  assert.equal(requested[2].searchParams.get("page"), "2");
});

test("rejects a rerun started while its jobs were being checked", async () => {
  await assert.rejects(
    check([
      { workflow_runs: [run] },
      { total_count: 2, jobs },
      { ...run, run_attempt: 3, status: "in_progress", conclusion: null },
    ]).result,
    /CI run changed/
  );
});

test("fails closed when GitHub cannot be queried", async () => {
  await assert.rejects(
    check([new Response("Forbidden", { status: 403 })]).result,
    /GitHub API.*403/
  );
});
