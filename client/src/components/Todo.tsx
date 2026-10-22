import type { Todo as TodoItem } from '../features/todos/todosApi';
import type { TodoPriority, TodoStatus } from '../utils/types';

interface TodoProps {
  todo: TodoItem;
  onToggle: (completed: boolean) => void;
}


function Todo({ todo, onToggle }: TodoProps) {
  const isCompleted = todo.status === 'ACCOMPLISHED'

  const changeStatusStyle = (status: TodoStatus) => {
      if (status === "NEEDS_ACTION") {
        return "border-red-700 text-red-700"
      } else if (status === "IN_PROGRESS") {
        return "border-yellow-700 text-yellow-700"
      } else {
        return "border-green-700 text-green-700"
      }
  } 

  const changePriorityStyle = (priority: TodoPriority) => {
    if (priority === "HIGH") {
      return "border-red-700 text-red-700"
    } else if (priority === "MEDIUM") {
      return "border-yellow-700 text-yellow-700"
    } else {
      return "border-green-700 text-green-700"
    }
  }

  return (
    <li className="flex items-start gap-3 rounded-xl border border-secondary bg-neutral px-4 py-3">
      <input
        aria-label={`${isCompleted ? 'Completed' : 'Not completed'}: ${todo.title}`}
        checked={isCompleted}
        className="mt-1 size-4 accent-[#706AD4]"
        onChange={(event) => onToggle(event.target.checked)}
        type="checkbox"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={isCompleted ? 'font-medium text-tertiary line-through' : 'font-medium text-primary'}>
            {todo.title}
          </h3>
          <span className={`rounded-full px-2 py-0.5 text-xs border ${changeStatusStyle(todo.status)}`}>
            {todo.status
              .replaceAll('_', ' ')
              .toLowerCase()
              .replace(/^./, (letter) => letter.toUpperCase())}
          </span>
          <span className={`rounded-full border px-2 py-0.5 text-xs ${changePriorityStyle(todo.priority)}`}>
            {todo.priority.charAt(0) + todo.priority.slice(1).toLowerCase()} priority
          </span>
        </div>
        {todo.description && <p className="mt-1 text-sm text-secondary">{todo.description}</p>}
      </div>
    </li>
  )
}

export default Todo
