export interface ITodo {
  id: string;
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
  description?: string;
}

export type TodoStatus = "NEEDS_ACTION" | "IN_PROGRESS" | "ACCOMPLISHED";
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";
