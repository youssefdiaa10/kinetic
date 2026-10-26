import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TodosState } from "../../utils/types";

const initialState: TodosState = {
  selectedTodoId: null,
  userId: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSelectedTodoId: (state, action: PayloadAction<string | null>) => {
      state.selectedTodoId = action.payload;
    },
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    clearTodoSelection: (state) => {
      state.selectedTodoId = null;
    },
    resetTodosState: () => initialState,
  },
});

export const {
  setSelectedTodoId,
  setUserId,
  clearTodoSelection,
  resetTodosState,
} = todosSlice.actions;

export default todosSlice.reducer;
