# Repository Agent Guidance

## Project

DomainApp is Guy Green's personal portfolio and CV website. It contains professional and personal
information, a downloadable CV, and a chess page backed by the public Lichess API.

Use `README.md`, `package.json`, the current source, and the current issue as the source of truth.
Do not assume that nearby code is automatically the preferred pattern.

## Stack

- Node.js 22.22.2 or newer
- Yarn
- React 18 and TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Vitest and Testing Library

Use Yarn, not npm or pnpm. Do not create `package-lock.json` or `pnpm-lock.yaml`.

Common commands:

```bash
yarn install
yarn dev
yarn prettify
yarn test
yarn build
```

## Working Approach

- Understand the requested behavior and inspect the relevant routes, components, tests, and assets
  before changing code.
- Keep changes focused on the current issue.
- Preserve existing behavior unless the task explicitly changes it.
- Prefer simple, reversible solutions and reuse existing code where it remains suitable.
- Improve poor patterns in the touched area when doing so directly supports the requested change.
- Do not perform unrelated redesigns, broad refactors, or dependency upgrades.
- Do not add a dependency when the existing stack can solve the problem clearly.

## Content Accuracy

The website contains real personal and professional information.

- Never invent or guess employment dates, roles, achievements, contact details, project links,
  technology choices, or other biographical facts.
- If required personal information is missing, ask for it rather than filling it with plausible
  content.
- When changing biographical information, check every relevant web page and the downloadable CV for
  contradictions.
- Preserve the user's voice and avoid unsupported promotional claims.
- Never add secrets, private credentials, or non-public personal information.

## React and TypeScript

- Use functional components and hooks.
- Keep TypeScript strict; avoid `any`, unnecessary assertions, and boxed primitive types.
- Derive values instead of duplicating them in state.
- Do not update state during rendering.
- Keep components focused and extract a component when it represents a meaningful reusable concept.
- Avoid abstractions for hypothetical future use.
- Keep network access outside presentational components where practical.
- Handle loading, error, empty, and success states explicitly for asynchronous behavior.

## Routing

- Use React Router's `Link` or `NavLink` for internal navigation.
- Use normal anchor elements for external URLs, downloads, email links, and other browser-native
  destinations.
- Preserve browser history behavior and direct route loading.
- Give active navigation state an accessible visual indication.

## Styling and Accessibility

- Use the existing Tailwind styling approach and preserve the site's visual direction unless a
  redesign is requested.
- Keep layouts responsive at mobile and desktop widths.
- Use semantic HTML and native controls.
- Use links for navigation and buttons for actions.
- Give meaningful images and icon-only links accessible names.
- Preserve visible keyboard focus and respect reduced-motion preferences.
- Do not reproduce an inaccessible existing pattern merely for consistency.

## Testing

Follow test-driven development for behavior changes:

- Red: write or update a focused test that fails for the expected reason.
- Green: implement the smallest clear change that makes the test pass.
- Refactor: improve the implementation while keeping the suite green.
- Test behavior visible to users rather than component implementation details.
- Cover important route behavior, state transitions, loading, errors, and edge cases relevant to the
  change.
- Mock external network boundaries; do not depend on live services in automated tests.
- Keep existing tests passing unless the requested behavior intentionally changes.
- Documentation, configuration-only changes, and mechanical refactors do not require artificial
  tests when they do not change behavior.

## Discovered Improvements

When work reveals a bug, gap, risk, or worthwhile improvement outside the current issue:

- Point it out with concise evidence, likely impact, and a recommended scope.
- Do not silently include unrelated work in the current change.
- Ask the user whether they want a GitHub issue created for it.
- Do not create the issue unless the user explicitly agrees.
- Continue the current task when the discovery does not block it.

## Verification

Before reporting implementation work as complete, run:

```bash
yarn prettify
yarn test
yarn build
```

Also review the final diff for unrelated changes. Do not claim a command passed unless it was run
successfully. Clearly distinguish pre-existing warnings or failures from regressions introduced by
the change.

## Git and External Actions

- Do not commit, push, create branches, open pull requests, merge changes, or modify GitHub issues
  unless the user explicitly requests that action.
- Do not overwrite unrelated local changes.
- Keep commits and pull requests focused on one issue when those actions are requested.
- Link pull requests to their issue and summarize the verification performed.

## Repository Skills

Do not create a repository skill for general instructions already covered here. Add a skill only
when a repeatable, multi-step repository workflow has been demonstrated and benefits from dedicated
instructions, templates, scripts, or assets.

## Completion Report

Summarize:

1. What changed.
2. The important files and decisions.
3. Commands run and their results.
4. Remaining risks or manual verification.
