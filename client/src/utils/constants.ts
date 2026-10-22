import type { Todo } from "./types";

export const TODO_DEFAULTS = {
  status: "NEEDS_ACTION",
  priority: "MEDIUM",
} as const;

export const TODO_STATUSES = [
  "NEEDS_ACTION",
  "IN_PROGRESS",
  "ACCOMPLISHED",
] as const;
export const TODO_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export const TODOS: Todo[] = [
  {
    id: "todo-1",
    title: "Review project requirements",
    status: "ACCOMPLISHED",
    priority: "HIGH",
    description: "Confirm the project goals, scope, and acceptance criteria.",
  },
  {
    id: "todo-2",
    title: "Set up the development environment",
    status: "ACCOMPLISHED",
    priority: "HIGH",
    description:
      "Install dependencies and configure the local development tools.",
  },
  {
    id: "todo-3",
    title: "Create the application layout",
    status: "ACCOMPLISHED",
    priority: "MEDIUM",
    description: "Build the shared page structure and navigation.",
  },
  {
    id: "todo-4",
    title: "Add user authentication",
    status: "IN_PROGRESS",
    priority: "HIGH",
    description: "Implement sign-in and sign-up flows for users.",
  },
  {
    id: "todo-5",
    title: "Build the todo list view",
    status: "IN_PROGRESS",
    priority: "HIGH",
    description: "Display todos with their current status and priority.",
  },
  {
    id: "todo-6",
    title: "Add todo creation",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description: "Let users create a todo with a title and optional details.",
  },
  {
    id: "todo-7",
    title: "Add todo editing",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description: "Allow users to update existing todo fields.",
  },
  {
    id: "todo-8",
    title: "Add todo deletion",
    status: "NEEDS_ACTION",
    priority: "LOW",
    description: "Provide a way to remove todos that are no longer needed.",
  },
  {
    id: "todo-9",
    title: "Add completion toggling",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description: "Allow users to mark a todo accomplished or reopen it.",
  },
  {
    id: "todo-10",
    title: "Connect the API",
    status: "NEEDS_ACTION",
    priority: "HIGH",
    description: "Connect client todo views to the server endpoints.",
  },
  {
    id: "todo-11",
    title: "Add loading states",
    status: "NEEDS_ACTION",
    priority: "LOW",
    description: "Show clear feedback while todo data is loading.",
  },
  {
    id: "todo-12",
    title: "Add error handling",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description: "Display helpful feedback when a request fails.",
  },
  {
    id: "todo-13",
    title: "Improve mobile styling",
    status: "NEEDS_ACTION",
    priority: "LOW",
    description: "Check the interface on narrow screens and refine spacing.",
  },
  {
    id: "todo-14",
    title: "Check keyboard accessibility",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description: "Ensure the main interactions work with a keyboard.",
  },
  {
    id: "todo-15",
    title: "Add empty list messaging",
    status: "NEEDS_ACTION",
    priority: "LOW",
    description: "Explain what users can do when they have no todos.",
  },
  {
    id: "todo-16",
    title: "Review form validation",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description:
      "Validate required fields and show useful validation messages.",
  },
  {
    id: "todo-17",
    title: "Verify API response types",
    status: "NEEDS_ACTION",
    priority: "HIGH",
    description: "Keep client todo types aligned with server responses.",
  },
  {
    id: "todo-18",
    title: "Update project documentation",
    status: "NEEDS_ACTION",
    priority: "LOW",
    description: "Document setup instructions and key project workflows.",
  },
  {
    id: "todo-19",
    title: "Review the finished interface",
    status: "NEEDS_ACTION",
    priority: "MEDIUM",
    description: "Inspect the interface for consistency and usability.",
  },
  {
    id: "todo-20",
    title: "Prepare the project for release",
    status: "NEEDS_ACTION",
    priority: "HIGH",
    description: "Complete the release checklist and prepare the deployment.",
  },
];
