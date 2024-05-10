import { describe, expect, test } from "vitest";
import {
  addTask,
  deleteTask,
  finishTask,
  taskReducer,
  updateTask,
} from "../store/tasks";

describe("task controls", () => {
  test("should add task", () => {
    const init = { storedTasks: [], taskHistory: [], taskFuturity: [] };
    const tasks = taskReducer(
      init,
      addTask({
        taskName: "Add Task Unit Test",
        taskCategory: "Add Task Unit Test",
      })
    );
    expect(tasks.storedTasks.length).toEqual(1);
    expect(tasks.storedTasks[0].name).toEqual("Add Task Unit Test");
    expect(tasks.storedTasks[0].category).toEqual("Add Task Unit Test");
  });

  test("should edit task", () => {
    const init = {
      storedTasks: [
        {
          id: 1,
          name: "Edit Task Unit Test",
          category: "Edit Task Unit Test",
          finished: true,
          startDateTime: new Date(2024, 5, 5).toLocaleString(),
          elapsedTime: 1000,
        },
      ],
      taskHistory: [],
      taskFuturity: [],
    };
    const tasks = taskReducer(
      init,
      updateTask({
        taskId: 1,
        taskName: "I am updated",
        taskCategory: "I am also updated",
      })
    );
    expect(tasks.storedTasks[0].name).toEqual("I am updated");
    expect(tasks.storedTasks[0].category).toEqual("I am also updated");
  });

  test("should delete task", () => {
    const init = {
      storedTasks: [
        {
          id: 1,
          name: "Delete Task Unit Test",
          category: "Delete Task Unit Test",
          finished: true,
          startDateTime: new Date(2024, 5, 5).toLocaleString(),
          elapsedTime: 1000,
        },
      ],
      taskHistory: [],
      taskFuturity: [],
    };

    const tasks = taskReducer(
      init,
      deleteTask({
        taskId: "1",
      })
    );
    expect(tasks.storedTasks.length).toEqual(0);
  });

  test("should finish task", () => {
    const init = {
      storedTasks: [
        {
          id: 1,
          name: "Finish Task Unit Test",
          category: "Finish Task Unit Test",
          finished: false,
          startDateTime: new Date(2024, 5, 5).toLocaleString(),
          elapsedTime: null,
        },
      ],
      taskHistory: [],
      taskFuturity: [],
    };
    const tasks = taskReducer(
      init,
      finishTask({
        taskId: 1,
      })
    );

    expect(tasks.storedTasks[0].finished).toEqual(true);
    expect(tasks.storedTasks[0].elapsedTime).toEqual(
      //time in seconds between task start and now
      (new Date(Date.now()).getTime() -
        new Date(tasks.storedTasks[0].startDateTime).getTime()) /
        1000
    );
  });
});
