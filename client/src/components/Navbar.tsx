import { Link, NavLink } from 'react-router';

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-indigo-50 text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
    }`

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10"
      >
        <Link className="text-xl font-bold tracking-tight text-primary" to="/">
          Kinetic
        </Link>
        <div className="flex items-center gap-1">
          <NavLink className={linkClass} end to="/">Home</NavLink>
          <NavLink className={linkClass} to="/todos">Todos</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
