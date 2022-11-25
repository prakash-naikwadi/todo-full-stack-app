import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import SideDrawer from "./components/shared/SideDrawer";
import ToDoView from "./components/shared/ToDoView";
import TasksPage from "./pages/TasksPage";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodosData = async () => {
    // fetching todos API call
    const res = await axios.get("/getToDos");
    setTodos(res.data.Todos);
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  return (
    <div className="container flex mx-auto">
      <Router>
        <SideDrawer />

        <Routes>
          <Route path="/" element={<ToDoView />} />
          <Route
            path="/:todoId/tasks"
            element={
              <TasksPage todos={todos} fetchTodosData={fetchTodosData} />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
