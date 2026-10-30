import { yupResolver } from "@hookform/resolvers/yup";
import { skipToken } from "@reduxjs/toolkit/query";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppSelector, useToast } from "../app/hooks";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../features/todos/todosApi";
import {
  TODO_DEFAULTS,
  TODO_PRIORITIES,
  TODO_STATUSES,
} from "../utils/constants";
import { createTodoSchema } from "../utils/schema";
import type { ICreateTodo, ITodo } from "../utils/types";
import Todo from "./Todo";

function Todolist() {
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const toast = useToast();
  const userId =
    useAppSelector((state) => state.todos.userId) ??
    localStorage.getItem("userId");
  const {
    data: todos = [],
    error: todosError,
    isLoading: isLoadingTodos,
    refetch: refetchTodos,
  } = useGetTodosQuery(userId ?? skipToken);
  const [createTodo, { isLoading: isCreatingTodo }] = useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdatingTodo }] = useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeletingTodo }] = useDeleteTodoMutation();

  const showRequestError = (error: unknown, fallback: string) => {
    if (
      typeof error === "object" &&
      error !== null &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "message" in error.data &&
      typeof error.data.message === "string"
    ) {
      toast.error(error.data.message);
      return;
    }

    toast.error(fallback);
  };

  const handleUpdateTodo = async (
    id: string,
    updates: Partial<
      Pick<ITodo, "title" | "description" | "status" | "priority">
    >,
  ): Promise<boolean> => {
    try {
      await updateTodo({ id, changes: updates }).unwrap();
      toast.success("Todo updated.");
      return true;
    } catch (error) {
      showRequestError(error, "Could not update this todo.");
      return false;
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    await handleUpdateTodo(id, {
      status: completed ? "ACCOMPLISHED" : "NEEDS_ACTION",
    });
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id).unwrap();
      toast.success("Todo deleted.");
    } catch (error) {
      showRequestError(error, "Could not delete this todo.");
    }
  };

  const { register, handleSubmit, reset } = useForm<ICreateTodo>({
    resolver: yupResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TODO_DEFAULTS.status,
      priority: TODO_DEFAULTS.priority,
    },
  });

  const handleCreateTodo: SubmitHandler<ICreateTodo> = async (values) => {
    if (!userId) {
      toast.error("Please sign in again before creating a todo.");
      return;
    }

    try {
      await createTodo({
        title: values.title.trim(),
        description: values.description?.trim() || undefined,
        status: values.status,
        priority: values.priority,
        userId,
      }).unwrap();
      reset();
      setIsCreateFormOpen(false);
      toast.success("Todo created.");
    } catch (error) {
      showRequestError(error, "Could not create this todo.");
    }
  };

  if (!userId) {
    return (
      <p
        className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        role="alert"
      >
        Your account could not be identified. Please sign in again to view your
        todos.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <button
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-secondary"
          onClick={() => setIsCreateFormOpen((isOpen) => !isOpen)}
          type="button"
        >
          {isCreateFormOpen ? (
            <X aria-hidden="true" className="size-4" />
          ) : (
            <Plus aria-hidden="true" className="size-4" />
          )}
          {isCreateFormOpen ? "Cancel" : "Create todo"}
        </button>
      </div>

      {isCreateFormOpen && (
        <form
          className="mb-6 grid gap-4 rounded-2xl border border-secondary bg-neutral p-5 shadow-sm sm:grid-cols-2"
          onSubmit={handleSubmit(handleCreateTodo)}
        >
          <div className="sm:col-span-2">
            <label
              className="mb-1 block text-sm font-medium text-primary"
              htmlFor="todo-title"
            >
              Title
            </label>
            <input
              autoFocus
              className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-title"
              {...register("title")}
              placeholder="What needs to get done?"
              required
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-primary"
              htmlFor="todo-description"
            >
              Description
            </label>
            <textarea
              className="w-full resize-y rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-description"
              {...register("description")}
              placeholder="Add a few details (optional)"
              rows={2}
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-primary"
              htmlFor="todo-status"
            >
              Status
            </label>
            <select
              className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-status"
              {...register("status")}
            >
              {TODO_STATUSES.map((todoStatus) => (
                <option key={todoStatus} value={todoStatus}>
                  {todoStatus
                    .replaceAll("_", " ")
                    .toLowerCase()
                    .replace(/^./, (letter) => letter.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="mb-1 block text-sm font-medium text-primary"
              htmlFor="todo-priority"
            >
              Priority
            </label>
            <select
              className="w-full rounded-lg border border-secondary bg-neutral px-3 py-2 text-primary outline-none focus:border-primary"
              id="todo-priority"
              {...register("priority")}
            >
              {TODO_PRIORITIES.map((todoPriority) => (
                <option key={todoPriority} value={todoPriority}>
                  {todoPriority.charAt(0) + todoPriority.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end sm:col-span-2">
            <button
              className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-neutral transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60"
              disabled={isCreatingTodo}
              type="submit"
            >
              {isCreatingTodo ? "Adding..." : "Add todo"}
            </button>
          </div>
        </form>
      )}

      {isLoadingTodos ? (
        <p aria-live="polite" className="py-8 text-center text-secondary">
          Loading todos...
        </p>
      ) : todosError ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          role="alert"
        >
          <p>Could not load your todos. Check your connection and try again.</p>
          <button
            className="mt-2 font-semibold underline"
            onClick={() => refetchTodos()}
            type="button"
          >
            Retry
          </button>
        </div>
      ) : todos.length === 0 ? (
        <p className="rounded-lg border border-secondary bg-neutral p-6 text-center text-secondary">
          You don’t have any todos yet. Create one to get started.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              isUpdating={isUpdatingTodo}
              isDeleting={isDeletingTodo}
              onToggle={(completed) => handleToggleTodo(todo.id, completed)}
              onUpdate={(updates) => handleUpdateTodo(todo.id, updates)}
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todolist;
