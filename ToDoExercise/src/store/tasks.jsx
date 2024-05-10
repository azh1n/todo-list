import { createSlice } from "@reduxjs/toolkit";

let lastId = 2;
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    storedTasks: [
      {
        id: 1,
        name: "test1",
        category: "category1",
        finished: true,
        startDateTime: new Date(2024, 5, 5).toLocaleDateString(),
        endDateTime: new Date(2024, 5, 6).toLocaleDateString(),
      },
      {
        id: 2,
        name: "test2",
        category: "category2",
        finished: true,
        startDateTime: new Date(2024, 5, 5).toLocaleDateString(),
        endDateTime: new Date(2024, 5, 6).toLocaleDateString(),
      },
    ],
  },
  reducers: {
    addTask: (tasks, action) => {
      const { taskName, taskCategory } = action.payload;
      lastId++;

      const now = new Date().toLocaleDateString();

      tasks.storedTasks.push({
        id: lastId,
        name: taskName,
        category: taskCategory,
        finished: false,
        startDateTime: now,
        endDateTime: undefined,
      });
    },
    updateTask: (tasks, action) => {
      const { taskId, taskName, taskCategory } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);

      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
        name: taskName,
        category: taskCategory,
      };
    },
    deleteTask: (tasks, action) => {
      const { taskId } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);

      tasks.storedTasks.splice(taskIndex, 1);
    },
    finishTask: (tasks, action) => {
      const { taskId } = action.payload;
      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);

      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
        finished: true,
      };
    },
  },
});

export const { getTasks } = (state) => state.store.currentTasks;

export const { addTask, updateTask, deleteTask, finishTask } =
  taskSlice.actions;

export const taskReducer = taskSlice.reducer;
