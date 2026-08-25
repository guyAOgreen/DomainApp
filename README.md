# Guy Green's Domain App

A personal portfolio and CV website built with React and TypeScript. The site brings together my professional experience, interests, social profiles, and recent chess games.

## What's included

- A homepage with a short introduction and overview of my interests
- An About Me page with a personal profile and photo gallery
- A CV page with an online summary and downloadable PDF
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
| `yarn start` | Alias for the Vite development server. |
| `yarn test` | Run the Vitest suite once. |
| `yarn test:watch` | Run Vitest in watch mode. |
| `yarn build` | Type-check and create an optimized production build in `dist/`. |
| `yarn preview` | Preview the production build locally. |
| `yarn prettify` | Check the repository's Prettier formatting. |
| `yarn prettify:fix` | Apply Prettier formatting. |

## Project structure

```text
src/
├── assets/       Images, GIFs, and the downloadable CV
├── components/   Shared navigation, social, loading, and tab components
├── constants/    Shared application constants
├── pages/        Home, About Me, CV, and Chess routes
└── utils/        Utilities for processing Lichess game data
```

## External data

The chess page requests recent public games from the [Lichess API](https://lichess.org/api). If the API is unavailable, that page may not be able to display recent games.

## Deployment

Run `yarn build` and deploy the generated `dist/` directory to a static host. The host must
serve `index.html` as the fallback for unknown paths so React Router routes can be loaded directly.

## License

No license has been added to this repository. All rights are reserved unless a license is added later.
