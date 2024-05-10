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
        startDateTime: new Date(2024, 5, 5).toLocaleString(),
        elapsedTime: 600,
      },
      {
        id: 2,
        name: "test2",
        category: "category2",
        finished: true,
        startDateTime: new Date(2024, 5, 5).toLocaleString(),
        elapsedTime: 6000,
      },
    ],
    taskHistory: [],
    taskFuturity: [],
  },
  reducers: {
    addTask: (tasks, action) => {
      const { taskName, taskCategory } = action.payload;
      lastId++;

      const now = new Date().toLocaleString();
      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];
      tasks.storedTasks.push({
        id: lastId,
        name: taskName,
        category: taskCategory,
        finished: false,
        startDateTime: now,
        elapsedTime: null,
      });
    },
    updateTask: (tasks, action) => {
      const { taskId, taskName, taskCategory } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);

      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];
      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
        name: taskName,
        category: taskCategory,
      };
    },
    deleteTask: (tasks, action) => {
      const { taskId } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);

      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
      };
      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];
      tasks.storedTasks.splice(taskIndex, 1);
    },
    finishTask: (tasks, action) => {
      const { taskId } = action.payload;
      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);

      var startDateTime = tasks.storedTasks[taskIndex].startDateTime;
      var endDateTime = Date.now();
      var seconds =
        (new Date(endDateTime).getTime() - new Date(startDateTime).getTime()) /
        1000;

      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];
      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
        finished: true,
        elapsedTime: seconds,
      };
    },
    undoAction: (tasks) => {
      tasks.taskFuturity = [...tasks.taskHistory, [...tasks.storedTasks]];

      const lastAction = tasks.taskHistory[tasks.taskHistory.length - 1];
      const history = tasks.taskHistory.slice(0, tasks.taskHistory.length - 1);

      tasks.storedTasks = [...lastAction];
      tasks.taskHistory = history;
    },
    redoAction: (tasks) => {
      const redoAction = tasks.taskFuturity[tasks.taskFuturity.length - 1];
      const resetHistory = tasks.taskFuturity;

      tasks.storedTasks = [...redoAction];
      tasks.taskHistory = resetHistory;
    },
  },
});

export const { getTasks } = (state) => state.store.currentTasks;

export const {
  addTask,
  updateTask,
  deleteTask,
  finishTask,
  undoAction,
  redoAction,
} = taskSlice.actions;

export const taskReducer = taskSlice.reducer;
