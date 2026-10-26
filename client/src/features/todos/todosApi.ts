import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITodo } from "../../utils/types";

export type { ITodo } from "../../utils/types";

export type CreateTodoArgs = Omit<ITodo, "id"> & { userId: string };

export interface UpdateTodoArgs {
  id: string;
  changes: Partial<Omit<ITodo, "id">>;
}

export interface UpdateTodoResponse {
  message: string;
  todo: ITodo;
}

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/todos/",
    prepareHeaders: (headers) => {
      const token =
        typeof localStorage === "undefined"
          ? null
          : localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Todos"],
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], string>({
      query: (userId) => ({
        url: "all",
        params: { id: userId },
      }),
      providesTags: (todos) => [
        {
          type: "Todos",
          id: "LIST",
        },
        ...(todos ?? []).map(({ id }) => ({
          type: "Todos" as const,
          id,
        })),
      ],
    }),

    getTodo: build.query<ITodo, string>({
      query: (id) => ({
        url: "one",
        params: { id },
      }),
      providesTags: (_todo, _error, id) => [{ type: "Todos", id }],
    }),

    createTodo: build.mutation<ITodo, CreateTodoArgs>({
      query: (body) => ({
        url: "create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Todos", id: "LIST" }],
    }),

    updateTodo: build.mutation<UpdateTodoResponse, UpdateTodoArgs>({
      query: ({ id, changes }) => ({
        url: `update/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Todos", id },
        { type: "Todos", id: "LIST" },
      ],
    }),

    deleteTodo: build.mutation<string, string>({
      query: (id) => ({
        url: "delete",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Todos", id },
        { type: "Todos", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useGetTodoQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosApi;
