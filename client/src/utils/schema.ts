import * as Yup from "yup";
import { TODO_PRIORITIES, TODO_STATUSES } from "./constants";
import type { TodoPriority, TodoStatus } from "./types";

export const signupSchema = Yup.object({
  username: Yup.string().required("Username Required"),
  email: Yup.string().email("Email is Invalid").required("Email Required"),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,32}$/,
    )
    .required("Password Required"),
});

export const signinSchema = Yup.object({
  email: Yup.string().email("Email is Invalid").required("Email Required"),
  password: Yup.string()
    .matches(
      /^[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,32}$/,
    )
    .required("Password Required"),
});

export const todoEditSchema = Yup.object({
  title: Yup.string().trim().required("Title is required."),
  description: Yup.string().defined(),
  status: Yup.mixed<TodoStatus>()
    .oneOf([...TODO_STATUSES])
    .required(),
  priority: Yup.mixed<TodoPriority>()
    .oneOf([...TODO_PRIORITIES])
    .required(),
});

export const createTodoSchema = Yup.object({
  title: Yup.string().trim().required("Title is required."),
  description: Yup.string().optional(),
  status: Yup.mixed<TodoStatus>()
    .oneOf([...TODO_STATUSES])
    .required(),
  priority: Yup.mixed<TodoPriority>()
    .oneOf([...TODO_PRIORITIES])
    .required(),
});
