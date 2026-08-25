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
- Create React App

## Getting started

### Prerequisites

- Node.js 20
- npm or Yarn

### Installation

Clone the repository and install its dependencies:

```bash
git clone git@github.com:guyAOgreen/DomainApp.git
cd DomainApp
npm install
```

Start the local development server:

```bash
npm start
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Run the app locally in development mode. |
| `npm test` | Run the test suite in watch mode. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm run prettify` | Check the repository's Prettier formatting. |
| `npm run prettify:fix` | Apply Prettier formatting. |

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

## License

No license has been added to this repository. All rights are reserved unless a license is added later.
