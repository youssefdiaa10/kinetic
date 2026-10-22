import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Todo } from "../../utils/types";

export type { Todo } from "../../utils/types";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => "todos",
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
