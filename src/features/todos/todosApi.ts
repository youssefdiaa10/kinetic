import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (build) => ({
    getTodos: build.query<Todo[], void>({
      query: () => 'todos',
    }),
  }),
})

export const { useGetTodosQuery } = todosApi
