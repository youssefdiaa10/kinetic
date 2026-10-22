import { Plus, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { TODOS, TODO_DEFAULTS, TODO_PRIORITIES, TODO_STATUSES } from '../utils/constants';
import type { ITodo, TodoPriority, TodoStatus } from '../utils/types';
import Todo from './Todo';

function Todolist() {
  const [todos, setTodos] = useState(TODOS);
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TodoPriority>(TODO_DEFAULTS.priority);
  const [status, setStatus] = useState<TodoStatus>(TODO_DEFAULTS.status);

  const toggleTodo = (id: string, completed: boolean) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, status: completed ? 'ACCOMPLISHED' : 'NEEDS_ACTION' }
          : todo,
      ),
    );
  };

  const updateTodo = (
    id: string,
    updates: Pick<ITodo, 'title' | 'description' | 'status' | 'priority'>,
  ) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  const createTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      priority,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
    setTitle('');
    setDescription('');
    setPriority(TODO_DEFAULTS.priority);
    setStatus(TODO_DEFAULTS.status);
    setIsCreateFormOpen(false);
  };

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-secondary"
          onClick={() => setIsCreateFormOpen((isOpen) => !isOpen)}
          type="button"
        >
          {isCreateFormOpen ? <X aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
          {isCreateFormOpen ? 'Cancel' : 'Create todo'}
        </button>
      </div>

      {isCreateFormOpen && (
        <form className="mb-6 grid gap-4 rounded-2xl border border-secondary bg-neutral p-5 shadow-sm sm:grid-cols-2" onSubmit={createTodo}>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-primary" htmlFor="todo-title">Title</label>
            <input
              autoFocus
              className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What needs to get done?"
              required
              value={title}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-primary" htmlFor="todo-description">Description</label>
            <textarea
              className="w-full resize-y rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-description"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a few details (optional)"
              rows={2}
              value={description}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-primary" htmlFor="todo-status">Status</label>
            <select
              className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-status"
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
            <label className="mb-1 block text-sm font-medium text-primary" htmlFor="todo-priority">Priority</label>
            <select
              className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-priority"
              onChange={(event) => setPriority(event.target.value as TodoPriority)}
              value={priority}
            >
              {TODO_PRIORITIES.map((todoPriority) => (
                <option key={todoPriority} value={todoPriority}>{todoPriority.charAt(0) + todoPriority.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end sm:col-span-2">
            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-secondary" type="submit">
              Add todo
            </button>
          </div>
        </form>
      )}

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onToggle={(completed) => toggleTodo(todo.id, completed)}
            onUpdate={(updates) => updateTodo(todo.id, updates)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Todolist
