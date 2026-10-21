import { Link } from 'react-router';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl items-center px-6 py-16 sm:px-10">
        <section className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Make room for what matters
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            A calmer way to get things done.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Keep your next steps in one simple place, then focus on one thing at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary" to="/todos">
              View your todos
            </Link>
            <Link className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100" to="/todos">
              Get started
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
