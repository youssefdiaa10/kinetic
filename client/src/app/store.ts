import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import { todosApi } from "../features/todos/todosApi";
import todosReducer from "../features/todos/todosSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,

  todos: todosReducer,
  [todosApi.reducerPath]: todosApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth", "Todos"],
  blacklist: [authApi.reducerPath, todosApi.reducerPath],
  version: 1,
};

const presistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    todos: todosReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todosApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
