import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import SideDrawer from "./components/SideDrawer";
import ToDoView from "./components/todo/ToDoView";
import TasksPage from "./pages/TasksPage";

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodosData = async () => {
    // fetching todos API call
    try {
      const res = await axios.get("/getToDos");
      setTodos(res.data.Todos.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  return (
    <div className="container flex mx-auto">
      <Router>
        <SideDrawer
          todos={todos}
          setTodos={setTodos}
          fetchTodosData={fetchTodosData}
        />

        <Routes>
          {console.log(todos)}
          {todos.length ? (
            <Route
              path="/"
              element={<Navigate to={`/${todos[0]._id}/tasks`} replace />}
            />
          ) : (
            <Route path="/" element={<ToDoView />} />
          )}

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
