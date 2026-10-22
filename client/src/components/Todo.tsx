import type { Todo as TodoItem } from '../features/todos/todosApi'

interface TodoProps {
  todo: TodoItem
}

function Todo({ todo }: TodoProps) {
  return (
    <li className="flex items-center gap-3 rounded-xl border border-secondary bg-neutral px-4 py-3">
      <input
        aria-label={`${todo.completed ? 'Completed' : 'Incomplete'}: ${todo.title}`}
        checked={todo.completed}
        className="size-4 accent-[#706AD4]"
        readOnly
        type="checkbox"
      />s
      <span className={todo.completed ? 'text-tertiary line-through' : 'text-primary'}>
        {todo.title}
      </span>
    </li>
  )
}

export default Todo
