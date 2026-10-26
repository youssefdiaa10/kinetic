import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function NotFound() {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <main className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 py-24 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-primary">Page not found</h1>
        <p className="mt-3 text-secondary">The page you’re looking for doesn’t exist.</p>
        <Link className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-neutral transition-colors duration-200 hover:bg-secondary" to="/">
          Return home
        </Link>
      </main>
    </div>
  )
}

export default NotFound
