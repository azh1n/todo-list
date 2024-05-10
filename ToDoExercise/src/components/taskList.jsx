/*
Display: Page should display a list of ToDo items with the following actions:
    Add Task: Provide an input field to add new tasks to the list.
    Delete Task: Add a delete button next to each task. When clicked, the task is deleted.
    Edit Task: Add an edit button next to each task. When clicked, the task becomes editable.
    Complete Task: Implement an intuitive way for the user to set a task as 'done'.
    Undo Action: Add an undo button which will undo the previous Add/Delete action
*/
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask, finishTask } from "../store/tasks";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import UndoIcon from "@mui/icons-material/Undo";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PublishIcon from "@mui/icons-material/Publish";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export function TaskList() {
  const dispatch = useDispatch();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarButtonText, setSnackbarButtonText] = useState("");
  const handleOpen = () => setTaskModalOpen(true);
  const handleClose = () => setTaskModalOpen(false);

  const [taskId, setTaskId] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskCategory, setTaskCategory] = useState("Misc");
  const [taskFinished, setTaskFinished] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function displayTasks(
    id,
    name,
    category,
    finished,
    startDateTime,
    endDateTime
  ) {
    return { id, name, finished, category, startDateTime, endDateTime };
  }

  const tasks = useSelector((state) => state.tasks);
  const rows = [];
  tasks.storedTasks.map((task) => {
    const row = displayTasks(
      task.id,
      task.name,
      task.category,
      task.finished,
      task.startDateTime,
      task.endDateTime
    );
    rows.push(row);
  });

  const addTaskClicked = () => {
    setIsEditing(false);
    setTaskName("");
    setTaskCategory("Misc");
    handleOpen();
  };

  const editTaskClicked = (row) => {
    setTaskId(row.id);
    setTaskName(row.name);
    setTaskFinished(row.finished);
    setIsEditing(true);
    handleOpen();
  };

  const handleAddTask = () => {
    dispatch(addTask({ taskName: taskName, taskCategory: taskCategory }));
    handleClose();
    handleSnackbar("Task has been added", "Undo");
    setSnackbarOpen(true);
  };

  const handleEditTask = () => {
    dispatch(
      updateTask({
        taskId: taskId,
        taskName: taskName,
        taskCategory: taskCategory,
      })
    );
    handleClose();
    handleSnackbar("Task has been updated", "Undo");
    setSnackbarOpen(true);
  };

  const handleDeleteTask = (row) => {
    dispatch(deleteTask({ taskId: row.id }));
    handleSnackbar("Task has been deleted", "Undo");
    setSnackbarOpen(true);
  };

  const handleFinishTask = () => {
    dispatch(finishTask({ taskId: taskId }));
    handleClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar = (message, buttonText) => {
    setSnackbarMessage(message);
    setSnackbarButtonText(buttonText);
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        sx={{
          transform: "translate(calc(41vw), calc(-80vh))",
          width: "300px",
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%", backgroundColor: "#33b249" }}
        >
          {snackbarMessage}
          <Button
            sx={{
              fontWeight: "bold",
            }}
          >
            <UndoIcon></UndoIcon>
            {snackbarButtonText}
          </Button>
        </Alert>
      </Snackbar>
      <Modal open={taskModalOpen} onClose={() => handleClose()}>
        <Container maxWidth="xs">
          <div className="task-modal">
            <div className="row">
              <div className="col-12 text-center">
                <h4>Add Task</h4>
              </div>
            </div>
            <br></br>
            <div className="row">
              <div className="col-12">
                <TextField
                  variant="outlined"
                  label="Name"
                  className="text-input"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                ></TextField>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <TextField
                  variant="outlined"
                  label="Category"
                  className="text-input"
                  value={taskCategory}
                ></TextField>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                {isEditing == true && taskFinished == false && (
                  <Button
                    value={taskFinished}
                    sx={{
                      width: "100px",
                      backgroundColor: "#33b249 !important",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleFinishTask()}
                  >
                    Finish
                  </Button>
                )}
              </div>
              <div className="col-6 text-center">
                {isEditing == false && (
                  <Button
                    sx={{
                      width: "100px",
                      backgroundColor: "#ffbd03 !important",
                      fontWeight: "bold",
                    }}
                    id="createTask"
                    className="float-end"
                    onClick={() => handleAddTask()}
                  >
                    <AddIcon></AddIcon>Add
                  </Button>
                )}
                {isEditing == true && (
                  <Button
                    sx={{
                      width: "100px",
                      backgroundColor: "#ffbd03 !important",
                      fontWeight: "bold",
                    }}
                    id="updateTask"
                    className="float-end"
                    onClick={() => handleEditTask()}
                  >
                    <PublishIcon></PublishIcon>Update
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Modal>
      <Container
        sx={{
          width: "1000px !important",
        }}
      >
        <div className="task-list">
          <h1>Task List</h1>
          <h4>Add tasks below</h4>
          <div className="d-flex flex-row-reverse">
            <div className="col-3 remove-padding">
              <Button
                sx={{
                  width: "195px",
                  backgroundColor: "#ffbd03 !important",
                  fontWeight: "bold",
                }}
                className="float-end"
                onClick={() => addTaskClicked()}
              >
                <AddIcon></AddIcon>Add Task
              </Button>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Task #</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Finished</TableCell>
                  <TableCell align="right">Start Date</TableCell>
                  <TableCell align="right">End Date</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">
                      {row.finished.toString()}
                    </TableCell>
                    <TableCell align="right">{row.startDateTime}</TableCell>
                    <TableCell align="right">{row.endDateTime}</TableCell>
                    <TableCell>
                      <div className="float-end">
                        <Button
                          onClick={() => editTaskClicked(row)}
                          sx={{
                            backgroundColor: "#4681f4 !important",
                            marginRight: "10px !important",
                            width: "90px !important",
                            fontWeight: "bold",
                          }}
                        >
                          <EditIcon></EditIcon>Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteTask(row)}
                          sx={{
                            backgroundColor: "#ED0800 !important",
                            width: "90px !important",
                            fontWeight: "bold",
                          }}
                        >
                          <DeleteForeverIcon></DeleteForeverIcon>Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
}
