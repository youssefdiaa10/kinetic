import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITodo } from "../../utils/types";

export type { ITodo } from "../../utils/types";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (build) => ({
    getTodos: build.query<ITodo[], void>({
      query: () => "todos",
    }),
  }),
});

export const { useGetTodosQuery } = todosApi;
