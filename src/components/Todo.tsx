import type { Todo as TodoItem } from '../features/todos/todosApi'

interface TodoProps {
  todo: TodoItem
}

function Todo({ todo }: TodoProps) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <input
        aria-label={`${todo.completed ? 'Completed' : 'Incomplete'}: ${todo.title}`}
        checked={todo.completed}
        className="size-4 accent-indigo-600"
        readOnly
        type="checkbox"
      />s
      <span className={todo.completed ? 'text-slate-400 line-through' : 'text-slate-800'}>
        {todo.title}
      </span>
    </li>
  )
}

export default Todo
