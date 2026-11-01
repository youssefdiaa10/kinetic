# Kinetic

Kinetic is a full-stack productivity app for managing personal tasks with a modern front end and a secure NestJS backend. The repository is organized as a monorepo with two separate Node.js apps:

- `client/` — React + TypeScript single-page app built with Vite
- `server/` — NestJS + TypeScript REST API backed by PostgreSQL and JWT auth

The project covers onboarding, authentication, user management, and a todo workspace, with the UI split into a landing/onboarding flow plus a protected main area for task management.

## Why this project exists

Kinetic combines a polished interface with a real backend so users can:

- create an account and sign in securely
- manage tasks through a protected todo dashboard
- store data in a relational database
- access a clean API layer for app logic and future extension
- run the frontend and backend independently during development

## Project overview

### Frontend

The client uses:

- React 19
- Vite
- TypeScript
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Formik / React Hook Form patterns
- Toast notifications

The app includes:

- onboarding screen at `/`
- signup page at `/signup`
- signin page at `/signin`
- protected home page at `/main/home`
- protected todo dashboard at `/main/todos`

### Backend

The server uses:

- NestJS 11
- TypeScript
- TypeORM
- PostgreSQL
- JWT-based authentication with Passport
- request validation using class-validator / class-transformer
- CORS enabled for local development

The backend is structured around modules for:

- authentication
- users
- todos

## Repository structure

```text
kinetic/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig*.json
├── server/
│   ├── src/
│   │   ├── auth/
│   │   ├── config/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── modules/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── docker-compose.yml
│   ├── package.json
│   └── tsconfig*.json
├── Diagram_ Todo list.png
├── LICENSE
└── README.md
```

## Features

- onboarding experience with guided navigation
- sign up and sign in workflows
- JWT-based private routes
- todo CRUD operations
- user lookup and management endpoints
- PostgreSQL-backed persistence
- validation and guarded access for protected endpoints
- clean separation between frontend app and API service

## Prerequisites

Before running the project locally, install:

- Node.js 18+ or 20+
- npm
- Docker Desktop (for the included PostgreSQL container)

## Local setup

From the repo root:

```bash
npm --prefix client install
npm --prefix server install
```

You can also install individually:

```bash
cd client && npm install
cd ../server && npm install
```

## Database setup

The server includes a Docker Compose file for local PostgreSQL.

From `server/`:

```bash
docker compose up -d postgres
```

Default values used by the compose file and config are:

- host: `localhost`
- port: `5434`
- username: `yosofalwakil`
- database: `kinetic`
- password: must be provided in `server/.env`

Create a `server/.env` file with values similar to:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5434
DB_USERNAME=yosofalwakil
DB_PASSWORD=your_secure_password
DB_NAME=kinetic
NODE_ENV=development
JWT_SECRET=replace_with_a_long_random_secret
```

The backend's configuration also includes a SQLite option, but the active app configuration targets PostgreSQL for local development and is intended to be used with Docker-backed Postgres.

## Running the app

### 1) Start the backend

```bash
cd server
npm run start:dev
```

The API listens on:

```text
http://localhost:3001
```

### 2) Start the frontend

Open a second terminal and run:

```bash
cd client
npm run dev
```

The frontend development server usually runs at:

```text
http://localhost:5173
```

The two apps are separate services and should be started independently.

## API overview

The server exposes routes from the root API origin, typically:

```text
http://localhost:3001
```

### Authentication

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/auth/signup` | Public | Register a new user |
| `POST` | `/auth/signin` | Public | Authenticate and receive tokens |
| `PATCH` | `/auth/verify` | Public | Verify a token |
| `POST` | `/auth/refresh` | Public | Refresh an access token |

### Users

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/user/all` | JWT required | Retrieve all users |
| `GET` | `/user/one` | JWT required | Find a specific user |

### Todos

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/todos/all` | JWT required | Fetch all todos for a user |
| `GET` | `/todos/one` | JWT required | Fetch a specific todo |
| `POST` | `/todos/create` | JWT required | Create a todo |
| `PATCH` | `/todos/update/:id` | JWT required | Update a specific todo |
| `DELETE` | `/todos/delete` | JWT required | Delete a todo |

Guarded routes rely on a valid JWT; the API enforces validation globally with `ValidationPipe` and request DTOs under `server/src/dtos/`.

## Useful commands

### Client

```bash
cd client
npm run dev
npm run build
npm run lint
npm run preview
```

### Server

```bash
cd server
npm run start:dev
npm run build
npm run start:prod
npm test
npm run test:e2e
npm run lint
```

## Development notes

- The backend uses `synchronize: true` in development mode, which is convenient for local work but is not a production-grade migration strategy.
- The frontend uses a client-side router and persists auth state via local storage when applicable.
- CORS is enabled for local development and may need tightening for production deployment.
- The project is intentionally split into two independently runnable apps, which keeps responsibilities clear but requires both to run for a fully functional experience.

## License

This project is licensed under the MIT License. See `LICENSE` for full details.
