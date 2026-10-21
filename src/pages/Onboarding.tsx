import { Link } from 'react-router'
import Navbar from '../components/Navbar'

function Onboarding() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-5xl items-center px-6 py-16 sm:px-10">
        <section className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Welcome to Kinetic</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Start with one small step.
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            Your workspace is ready. Head to your todo list to see what needs your attention.
          </p>
          <Link className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-secondary" to="/todos">
            Go to my todos
          </Link>
        </section>
      </main>
    </div>
  )
}

export default Onboarding
