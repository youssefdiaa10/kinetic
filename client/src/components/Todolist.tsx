import { useState } from 'react';
import { TODOS } from '../utils/constants';
import Todo from './Todo';

function Todolist() {
  const [todos, setTodos] = useState(TODOS);

  const toggleTodo = (id: string, completed: boolean) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: completed ? 'ACCOMPLISHED' : 'NEEDS_ACTION' }
          : todo,
      ),
    );
  };

  // const { data: todos, isLoading, isError } = useGetTodosQuery()

  // if (isLoading) {
  //   return <p className="text-sm text-secondary" role="status">Loading your todos…</p>
  // }

  // if (isError) {
  //   return (
  //     <p className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700" role="alert">
  //       Todos could not be loaded. Please try again later.
  //     </p>
  //   )
  // }

  // if (!todos?.length) {
  //   return (
  //     <div className="rounded-2xl border border-dashed border-tertiary bg-neutral p-8 text-center">
  //       <p className="font-semibold text-primary">Your list is clear.</p>
  //       <p className="mt-1 text-sm text-secondary">When you have todos, they’ll show up here.</p>
  //     </div>
  //   )
  // }

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          onToggle={(completed) => toggleTodo(todo.id, completed)}
        />
      ))}
    </ul>
  )
}

export default Todolist
