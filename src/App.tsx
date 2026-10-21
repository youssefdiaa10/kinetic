import { Link, Route, Routes } from 'react-router';

function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-12 sm:px-10">
      <header className="mb-16 flex items-center justify-between">
        <Link className="text-xl font-bold tracking-tight text-slate-900" to="/">
          Kinetic
        </Link>
        <nav aria-label="Main navigation" className="flex gap-6 text-sm font-medium text-slate-600">
          <Link className="transition hover:text-slate-950" to="/">Home</Link>
          <Link className="transition hover:text-slate-950" to="/todos">Todos</Link>
        </nav>
      </header>

      <section className="my-auto max-w-2xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          React · TypeScript · Vite
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
          Your todo app starts here.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          The project is ready for your features, with routing, Tailwind CSS, and Redux Toolkit
          Query wired in.
        </p>
        <Link
          className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          to="/todos"
        >
          Open todos
        </Link>
      </section>
    </main>
  )
}

function TodosPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12 sm:px-10">
      <Link className="text-sm font-medium text-indigo-600 hover:text-indigo-500" to="/">
        ← Home
      </Link>
      <h1 className="mt-10 text-3xl font-bold tracking-tight text-slate-950">Todos</h1>
      <p className="mt-3 text-slate-600">Your todo list will live here.</p>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-12 sm:px-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-950">Page not found</h1>
      <Link className="mt-4 inline-block text-indigo-600 hover:text-indigo-500" to="/">
        Return home
      </Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
