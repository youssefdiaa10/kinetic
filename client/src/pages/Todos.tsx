import Navbar from '../components/Navbar';
import Todolist from '../components/Todolist';

function Todos() {
  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Your workspace</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary">Todos</h1>
          <p className="mt-2 text-secondary">A clear view of what’s next.</p>
        </div>
        <Todolist />
      </main>
    </div>
  )
}

export default Todos
