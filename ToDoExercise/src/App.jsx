import { Route, Routes } from "react-router-dom";
import "./App.css";
import { TaskList } from "./components/taskList";
import { Metrics } from "./components/metrics";

function App() {
  return (
    <>
      <Routes>
        <Route path="/metrics" element={<Metrics />}></Route>
        <Route path="/tasks" element={<TaskList />}></Route>
        <Route path="/" element={<TaskList />}></Route>
      </Routes>
    </>
  );
}

export default App;
