import { Link } from 'react-router'
import Navbar from '../components/Navbar'

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 py-24 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you’re looking for doesn’t exist.</p>
        <Link className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary" to="/">
          Return home
        </Link>
      </main>
    </div>
  )
}

export default NotFound
