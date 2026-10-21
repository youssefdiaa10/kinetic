# Kinetic

Kinetic is a full-stack todo list application. The repository contains two separate Node.js projects:

- `client/` — a React and TypeScript single-page app built with Vite, React Router, Redux Toolkit, and Tailwind CSS.
- `server/` — a NestJS and TypeScript REST API using TypeORM, PostgreSQL, and JWT-based authentication.

The client currently provides onboarding, home, and todos screens. The initial route (`/`) displays onboarding; selecting **Next** opens Home (`/home`). The API supports user signup/signin and protected todo and user operations.

## Requirements

- Node.js and npm
- Docker Desktop (optional, for running the included PostgreSQL service)

## Install dependencies

Install each project's dependencies from the repository root:

```sh
npm --prefix client install
npm --prefix server install
```

Or install them separately:

```sh
cd client
npm install

cd ../server
npm install
```

Each project has its own `package.json`, lockfile, and `node_modules` directory.

## Run locally

### 1. Start PostgreSQL

From `server/`, start the database service with Docker Compose:

```sh
docker compose up -d postgres
```

The compose file uses these defaults: database `todo_db`, user `todo_user`, password `todo_pass`, and host port `5432`. Override them with environment variables as described below. Keep the database running while using the API.

### 2. Configure and start the API

The API reads environment variables from its process environment. Create `server/.env` (or set these variables in your shell):

```env
PORT=3000
JWT_SECRET=replace-with-a-long-random-secret
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=todo_user
DB_PASSWORD=todo_pass
DB_NAME=todo_db
NODE_ENV=development
```

Then run:

```sh
cd server
npm run start:dev
```

NestJS serves the API on `http://localhost:3000`. TypeORM schema synchronization is enabled outside production by the current configuration. Do not use that setting as a production migration strategy.

### 3. Start the web client

In another terminal:

```sh
cd client
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The client and server run as separate processes; stop each with `Ctrl+C`.

## API overview

All routes are served from the API origin, normally `http://localhost:3000`.

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/signup` | Public | Create a user account |
| `POST` | `/auth/signin` | Public | Sign in and receive access and refresh tokens |
| `PATCH` | `/auth/verify` | Public | Verify an access token |
| `POST` | `/auth/refresh` | Public | Get a new access token using a refresh token |
| `GET` | `/user/all` | JWT required | List users |
| `GET` | `/user/one` | JWT required | Find a user using the request body |
| `GET` | `/todos/all` | JWT required | List todos for the user ID in the request body |
| `GET` | `/todos/one` | JWT required | Find a todo using the request body |
| `POST` | `/todos/create` | JWT required | Create a todo |
| `PATCH` | `/todos/update/:id` | JWT required | Update a todo |
| `DELETE` | `/todos/delete` | JWT required | Delete a todo using the request body |

Protected routes require a valid JWT access token. The API applies request validation with a global NestJS validation pipe. See the DTOs in `server/src/dtos/` for request fields and validation rules.

## Useful commands

Run these from the relevant project directory:

| Project | Command | Description |
| --- | --- | --- |
| Client | `npm run dev` | Start the Vite development server |
| Client | `npm run build` | Type-check and build the client |
| Client | `npm run lint` | Lint client source files |
| Client | `npm run preview` | Preview the production client build |
| Server | `npm run start:dev` | Start NestJS in watch mode |
| Server | `npm run build` | Build the API |
| Server | `npm run start:prod` | Start the compiled API |
| Server | `npm test` | Run unit tests |
| Server | `npm run test:e2e` | Run end-to-end tests |
| Server | `npm run lint` | Lint and automatically fix server source files |

## Project layout

```text
client/
  src/
    app/          Redux store and hooks
    components/   Shared UI components
    features/     Client-side feature/API logic
    pages/        Onboarding, Home, Todos, and not-found screens
server/
  src/
    auth/         JWT strategy, guard, and decorators
    config/       Application and database configuration
    dtos/         Request data transfer objects
    entities/     TypeORM entities
    modules/      Auth, user, and todos modules
  test/           End-to-end tests
  docker-compose.yml
```

## Current integration note

The client todos API helper currently requests `/api/todos`, while the server exposes routes such as `/todos/all` and `/todos/create` directly on port `3000`. The Vite config does not currently define an `/api` proxy, and the client helper does not yet send an authorization token. Connect these pieces before relying on the Todos screen for live, authenticated API data.
