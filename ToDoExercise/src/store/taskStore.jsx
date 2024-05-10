import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./tasks.jsx";

export const taskStore = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
