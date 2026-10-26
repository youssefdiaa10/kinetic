export interface ITodo {
  id: string;
  title: string;
  status: TodoStatus;
  priority: TodoPriority;
  description?: string;
}

export type TodoStatus = "NEEDS_ACTION" | "IN_PROGRESS" | "ACCOMPLISHED";
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";

export interface TodosState {
  selectedTodoId: string | null;
  userId: string | null;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthState {
  email: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;
  isRefreshing: boolean;
}
