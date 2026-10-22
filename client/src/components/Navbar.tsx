import { Link, NavLink } from 'react-router';

function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${
      isActive ? 'bg-neutral text-primary' : 'text-secondary hover:bg-tertiary hover:text-neutral'
    }`

  return (
    <header className="border-b border-secondary bg-neutral">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 sm:px-10"
      >
        <Link className="text-2xl font-bold tracking-tight text-primary transition-colors duration-200 hover:text-secondary sm:text-3xl" to="/home">
          Kinetic
        </Link>
        <div className="flex items-center gap-1">
          <NavLink className={linkClass} end to="/home">Home</NavLink>
          <NavLink className={linkClass} to="/todos">Todos</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
