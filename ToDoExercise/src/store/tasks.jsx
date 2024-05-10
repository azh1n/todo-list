import { createSlice } from "@reduxjs/toolkit";

let lastId = 2;
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    storedTasks: [
      {
        id: 1,
        name: "Take the dog out",
        category: "Home",
        finished: true,
        startDateTime: new Date(2024, 5, 5).toLocaleString(),
        elapsedTime: 1000,
      },
      {
        id: 2,
        name: "Get Tara coffee",
        category: "Work",
        finished: true,
        startDateTime: new Date(2024, 5, 5).toLocaleString(),
        elapsedTime: 3000,
      },
    ],
    taskHistory: [],
    taskFuturity: [],
  },
  reducers: {
    addTask: (tasks, action) => {
      //update history
      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];

      const { taskName, taskCategory } = action.payload;
      lastId++;
      const now = new Date().toLocaleString();

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
      //update history
      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];

      const { taskId, taskName, taskCategory } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);
      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
        name: taskName,
        category: taskCategory,
      };
    },
    deleteTask: (tasks, action) => {
      //update history
      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];

      const { taskId } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);
      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
      };

      tasks.storedTasks.splice(taskIndex, 1);
    },
    finishTask: (tasks, action) => {
      //update history
      tasks.taskHistory = [...tasks.taskHistory, [...tasks.storedTasks]];

      const { taskId } = action.payload;

      var taskIndex = tasks.storedTasks.findIndex((t) => t.id === taskId);
      var startDateTime = tasks.storedTasks[taskIndex].startDateTime;
      var endDateTime = Date.now();
      //calc elapsed time between startDateTime and now
      var seconds =
        (new Date(endDateTime).getTime() - new Date(startDateTime).getTime()) /
        1000;

      tasks.storedTasks[taskIndex] = {
        ...tasks.storedTasks[taskIndex],
        finished: true,
        elapsedTime: seconds,
      };
    },
    undoAction: (tasks) => {
      //snapshot
      tasks.taskFuturity = [...tasks.taskHistory, [...tasks.storedTasks]];

      const lastAction = tasks.taskHistory[tasks.taskHistory.length - 1];
      const history = tasks.taskHistory.slice(0, tasks.taskHistory.length - 1);

      //restore lastaction to storage
      tasks.storedTasks = [...lastAction];
      //restore history
      tasks.taskHistory = history;
    },
    redoAction: (tasks) => {
      const redoAction = tasks.taskFuturity[tasks.taskFuturity.length - 1];
      const resetHistory = tasks.taskFuturity;

      //reset undo
      tasks.storedTasks = [...redoAction];
      //reset history
      tasks.taskHistory = resetHistory;
    },
  },
});

//exports
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
