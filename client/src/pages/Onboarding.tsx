import { Link } from 'react-router';
import Navbar from '../components/Navbar';

function Onboarding() {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl items-center px-6 py-16 sm:px-10">
        <section className="max-w-xl rounded-3xl border border-secondary bg-neutral p-8 shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Welcome to Kinetic</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Start with one small step.
          </h1>
          <p className="mt-4 leading-7 text-secondary">
            Your workspace is ready. Head to your todo list to see what needs your attention.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link className="inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-neutral transition-colors duration-200 hover:bg-secondary" to="/home">
              Next
            </Link>
            <Link className="inline-flex rounded-lg border border-tertiary px-5 py-3 text-sm font-semibold text-tertiary transition-colors duration-200 hover:bg-tertiary hover:text-neutral" to="/signup">
              Sign up
            </Link>
            <Link className="inline-flex rounded-lg border border-tertiary px-5 py-3 text-sm font-semibold text-tertiary transition-colors duration-200 hover:bg-tertiary hover:text-neutral" to="/login">
              Log in
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Onboarding
