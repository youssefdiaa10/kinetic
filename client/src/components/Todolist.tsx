import { useGetTodosQuery } from '../features/todos/todosApi';
import Todo from './Todo';

function Todolist() {
  const { data: todos, isLoading, isError } = useGetTodosQuery()

  if (isLoading) {
    return <p className="text-sm text-slate-500" role="status">Loading your todos…</p>
  }

  if (isError) {
    return (
      <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">
        Todos could not be loaded. Please try again later.
      </p>
    )
  }

  if (!todos?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <p className="font-semibold text-slate-800">Your list is clear.</p>
        <p className="mt-1 text-sm text-slate-500">When you have todos, they’ll show up here.</p>
      </div>
    )
  }

  return (
    <ul className="grid gap-3">
      {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
    </ul>
  )
}

export default Todolist
