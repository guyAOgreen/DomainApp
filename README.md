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
| `yarn test:coverage` | Run the suite with V8 coverage reports and minimum coverage checks. |
| `yarn test:watch` | Run Vitest in watch mode. |
| `yarn build` | Type-check and create an optimized production build in `dist/`. |
| `yarn preview` | Preview the production build locally. |
| `yarn prettify` | Check the repository's Prettier formatting. |
| `yarn prettify:fix` | Apply Prettier formatting. |

## Test coverage

Run `yarn test:coverage` locally. The console shows coverage by file and a total summary.
Open `coverage/index.html` for highlighted uncovered lines and branches; machine-readable
results are in `coverage/coverage-summary.json` and `coverage/coverage-final.json`.
These generated reports are ignored by Git, Prettier, and ESLint.

The pull-request and main-branch CI job runs this command instead of `yarn test`, so it runs
the suite once. Failed tests or coverage below any minimum fail the job. The `coverage-report`
artifact contains the HTML and JSON reports and is retained for 14 days, including when tests
or thresholds fail, provided report generation completes and the run is not cancelled.
Download and extract it, then open `index.html`. The separate manual production deployment
workflow retains its existing verification command, including support for older main commits.

### Initial baseline and thresholds

Measured on 9 September 2026 using Node.js 22.23.1, Vitest/V8 provider 4.1.11, and the existing
155 tests at application commit `e826495`:

| Metric | Initial coverage | Covered / total | Minimum |
| --- | --- | --- | --- |
| Lines | 97.95% | 239 / 244 | 90% |
| Statements | 98.03% | 250 / 255 | 90% |
| Functions | 100% | 89 / 89 | 90% |
| Branches | 94.67% | 160 / 169 | 85% |

The global minimums in `vite.config.ts` leave roughly 8–10 percentage points below the measured
baseline. For a personal portfolio, this provides a useful coverage floor while allowing sensible
changes without encouraging low-value tests to preserve near-perfect scores. Branch coverage has
a lower minimum to allow room for defensive and less common paths. Actual coverage remains
visible in every report and meaningful gaps still need review. This is a minimum gate, not an
exact comparison with the previous commit; reductions above a minimum can pass. There are no
per-file or changed-line gates.

The initial uncovered-code review found:

- `src/index.tsx` has two uncovered React startup statements. It stays included at 0%; the
  component tests render `App` directly and do not exercise browser startup.
- Image and chess galleries test forward navigation and wrapping back from the first item,
  but not stepping back from a later item. Those are useful behaviour-test follow-ups.
- Remaining gaps are empty-gallery guards, the unused `imageFit="cover"` option, the fallback
  page title, an invalid chess-tab fallback, and a null-ref guard for the CV preview.
- Gallery loading, validation, retry, timeout, cancellation, and the tested page loading/error
  states are already exercised. No production code is excluded to conceal the remaining gaps,
  and no tests were added solely to increase these percentages.

Coverage includes every `src/**/*.{ts,tsx}` file, even if no test imports it. Exclusions are
test files (`*.test.*`, `*.spec.*`, and `__tests__`), `src/setupTests.ts`, the `src/testUtils`
helpers/fixtures, `__fixtures__` directories, TypeScript declarations, and generated code named
`*.generated.ts`/`*.generated.tsx` or stored in `__generated__`. There are currently no generated
production TypeScript files; use these naming conventions only for actual generated output.
Assets and styles are outside the TypeScript include pattern. There are no other exclusions.

When changing code, inspect the HTML report and test meaningful user behaviour, especially
uncovered state transitions and error paths. Revisit thresholds when the project's needs change;
do not add implementation-detail or prose-matching tests just to raise the score. Any threshold
reduction or expanded exclusion must have a stated reason in the PR. Keep `vitest` and
`@vitest/coverage-v8` pinned to matching versions and recheck coverage when upgrading them or Node.
See the [Vitest 4 coverage configuration](https://v4.vitest.dev/config/coverage).

To check that the gate rejects insufficient coverage without changing the saved thresholds:

```bash
yarn test:coverage --coverage.thresholds.lines=100
```

With the baseline above, this command must exit nonzero after reporting line coverage below
100%, while still writing the reports. Run `yarn test:coverage` again for the normal passing run.

## Project structure

```text
src/
├── assets/       Images and GIFs
├── components/   Shared navigation, project cards, galleries, and other UI components
├── constants/    Shared application constants
├── data/         Typed project details and screenshot metadata
├── hooks/        Remote gallery loading state
├── pages/        Home, About Me, Projects, CV, and Chess routes
└── utils/        Gallery validation and Lichess game utilities
```

## Updating projects

The Projects page renders the ordered `projects` array in `src/data/projects.ts` using
`src/components/ProjectCard/ProjectCard.tsx`. Add an entry to that array to publish another
project on the page; no additional page markup is needed.

Each `Project` has a unique `id`, `title`, `description`, `stack`, `links`, `status`, and `images`.
Links contain a label and external URL. Status entries contain a unique name (such as "Web app"),
a state (`Live` or `In development`), and a description, allowing different parts of a project
to have different delivery states. Images contain `src`, `alt`, and `caption`, with optional
`thumbnailSrc` and `label`; their array order controls the gallery. Import local screenshots from
`src/assets/images/projects/` as the existing entry does.

`featured`, `role`, and `highlights` are optional. Empty collections hide their sections.
Use only verified project details and accurate screenshot descriptions. Run the normal checks
and inspect `/projects` at mobile and desktop widths after editing the data.

## External data

The chess page requests recent public games from the [Lichess API](https://lichess.org/api). If the API is unavailable, that page may not be able to display recent games.

### Updating the CV

The web résumé in `src/pages/CVPage/CVPage.tsx` is maintained separately from the hosted PDF.
When updating either version, reconcile role titles, dates, responsibilities, skills, projects,
and education with the current CV. Also check the professional summaries on Home and About Me
and the project details in `src/data/projects.ts`. Replacing the PDF does not update those pages.

The CV page presents the web résumé first. The PDF preview is collapsed on ordinary visits and
loads the document only when opened. Visiting `/cv#cv-preview` opens it automatically, including
after a reload. Above the résumé, visitors can open the PDF in a new tab or
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

### Site metadata and branding

`index.html` contains the portfolio title, description, and Open Graph / Twitter card metadata.
The sharing URLs use the public origin `https://guygreen.dev`. These tags are in the initial HTML
so crawlers can read them without running JavaScript. All routes share this portfolio preview;
React continues to set the browser tab title for each route. Route-specific sharing previews
would need separately generated HTML or server rendering.

The GG monogram uses the site's dark grey and blue palette. Its editable vector source is
`public/favicon.svg`; the sharing artwork is `public/social-preview.svg`. The checked-in exports
are `favicon.ico` (16, 32, and 48 pixels), `logo192.png`, `logo512.png`, `apple-touch-icon.png`
(180 pixels), and `social-preview.png` (1200 × 630 pixels). To change the artwork, edit the SVGs,
export them at those sizes, and replace the corresponding PNG/ICO files. Preserve transparent
corners in the PNG/ICO favicon exports (headless Chrome needs `--default-background-color=00000000`).
The Apple touch icon uses a solid `#111827` square background. Social metadata points
to the PNG export. Keep its dimensions and alt text in `index.html` in sync with the artwork.
`public/manifest.json` contains the app name and launch colours; its theme colour matches the
HTML theme colour and its background matches the site's light background.

After deployment, check the page source and open `https://guygreen.dev/social-preview.png`,
including when loading a nested route directly. Verify the favicon and a shared link preview
on the target platform; sharing services may cache an earlier preview and require a refresh
through their inspection tool.

### Production releases

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
