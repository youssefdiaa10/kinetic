# todolist_v4_ui

React + TypeScript todo app scaffolded with Vite.

## Start the app

```sh
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run preview` to serve it locally.

## Included

- Vite, React, and TypeScript
- Tailwind CSS v4 through the Vite plugin
- React Router with `/` and `/todos` routes
- Redux Toolkit and React Redux, configured with typed hooks
- RTK Query API at `src/features/todos/todosApi.ts` (expects `/api/todos`)

## Source layout

```text
src/
  app/                 Redux store and typed hooks
  features/todos/      RTK Query API and todo types
  App.tsx              Application routes
  index.css            Tailwind import and global styles
  main.tsx             React, Redux, and router providers
```
