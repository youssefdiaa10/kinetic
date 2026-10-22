import { Pencil, Save, Trash2, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { ITodo } from '../features/todos/todosApi';
import { TODO_PRIORITIES, TODO_STATUSES } from '../utils/constants';
import type { TodoPriority, TodoStatus } from '../utils/types';

interface TodoProps {
  todo: ITodo;
  onToggle: (completed: boolean) => void;
  onUpdate: (updates: Pick<ITodo, 'title' | 'description' | 'status' | 'priority'>) => void;
  onDelete: () => void;
}

function Todo({ todo, onToggle, onUpdate, onDelete }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description ?? '');
  const [status, setStatus] = useState<TodoStatus>(todo.status);
  const [priority, setPriority] = useState<TodoPriority>(todo.priority);
  const isCompleted = todo.status === 'ACCOMPLISHED'

  const startEditing = () => {
    setTitle(todo.title);
    setDescription(todo.description ?? '');
    setStatus(todo.status);
    setPriority(todo.priority);
    setIsEditing(true);
  };

  const saveChanges = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onUpdate({
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
    });
    setIsEditing(false);
  };

  const changeStatusStyle = (status: TodoStatus) => {
      if (status === "NEEDS_ACTION") {
        return "border-red-500 text-red-500"
      } else if (status === "IN_PROGRESS") {
        return "border-yellow-500 text-yellow-500"
      }
      return "border-green-500 text-green-500"
  } 

  const changePriorityStyle = (priority: TodoPriority) => {
    if (priority === "HIGH") {
      return "border-red-500 text-red-500"
    } else if (priority === "MEDIUM") {
      return "border-yellow-500 text-yellow-500"
    }
      return "border-green-500 text-green-500"
  }

  return (
    <li className="flex h-full items-stretch gap-3 rounded-xl border border-secondary bg-neutral px-4 py-3">
      <input
        aria-label={`${isCompleted ? 'Completed' : 'Not completed'}: ${todo.title}`}
        checked={isCompleted}
        className="mt-1 size-4 accent-[#706AD4]"
        disabled={isEditing}
        onChange={(event) => onToggle(event.target.checked)}
        type="checkbox"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        {isEditing ? (
          <form className="grid gap-3" onSubmit={saveChanges}>
            <div>
              <label className="mb-1 block text-xs font-medium text-primary" htmlFor={`edit-title-${todo.id}`}>Title</label>
              <input
                autoFocus
                className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-sm text-primary outline-none focus:border-primary"
                id={`edit-title-${todo.id}`}
                onChange={(event) => setTitle(event.target.value)}
                required
                value={title}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-primary" htmlFor={`edit-description-${todo.id}`}>Description</label>
              <textarea
                className="w-full resize-y rounded-lg border border-secondary bg-neutral px-3 py-2 text-sm text-primary outline-none focus:border-primary"
                id={`edit-description-${todo.id}`}
                onChange={(event) => setDescription(event.target.value)}
                rows={2}
                value={description}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-primary" htmlFor={`edit-status-${todo.id}`}>Status</label>
                <select
                  className="w-full rounded-lg border border-secondary bg-neutral px-2 py-2 text-sm text-primary outline-none focus:border-primary"
                  id={`edit-status-${todo.id}`}
                  onChange={(event) => setStatus(event.target.value as TodoStatus)}
                  value={status}
                >
                  {TODO_STATUSES.map((todoStatus) => (
                    <option key={todoStatus} value={todoStatus}>
                      {todoStatus.replaceAll('_', ' ').toLowerCase().replace(/^./, (letter) => letter.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-primary" htmlFor={`edit-priority-${todo.id}`}>Priority</label>
                <select
                  className="w-full rounded-lg border border-secondary bg-neutral px-2 py-2 text-sm text-primary outline-none focus:border-primary"
                  id={`edit-priority-${todo.id}`}
                  onChange={(event) => setPriority(event.target.value as TodoPriority)}
                  value={priority}
                >
                  {TODO_PRIORITIES.map((todoPriority) => (
                    <option key={todoPriority} value={todoPriority}>
                      {todoPriority.charAt(0) + todoPriority.slice(1).toLowerCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="inline-flex items-center gap-1 rounded-lg border border-secondary px-3 py-2 text-xs font-semibold text-primary hover:bg-secondary hover:text-white" onClick={() => setIsEditing(false)} type="button">
                <X aria-hidden="true" className="size-3.5" /> Cancel
              </button>
              <button className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-neutral hover:bg-secondary" type="submit">
                <Save aria-hidden="true" className="size-3.5" /> Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex h-full flex-col">
            <div>
              <h3 className={isCompleted ? 'font-medium text-tertiary line-through' : 'font-medium text-primary'}>
                {todo.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-2 py-0.5 text-xs ${changeStatusStyle(todo.status)}`}>
                  {todo.status.replaceAll('_', ' ').toLowerCase().replace(/^./, (letter) => letter.toUpperCase())}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-xs ${changePriorityStyle(todo.priority)}`}>
                  {todo.priority.charAt(0) + todo.priority.slice(1).toLowerCase()} priority
                </span>
              </div>
              {todo.description && <p className="mt-5 mb-1 italic text-sm text-secondary">{todo.description}</p>}
            </div>

            <div className="mt-auto flex justify-end gap-2 pt-3">
              <button
                aria-label={`Update ${todo.title}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-secondary px-3 py-2 text-xs font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-secondary hover:text-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={startEditing}
                type="button"
              >
                <Pencil aria-hidden="true" className="size-3.5" /> Update
              </button>
              <button
                aria-label={`Delete ${todo.title}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={onDelete}
                type="button"
              >
                <Trash2 aria-hidden="true" className="size-3.5" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  )
}

export default Todo
