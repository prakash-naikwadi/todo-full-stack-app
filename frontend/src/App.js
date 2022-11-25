import React, { useEffect, useState } from "react";
import axios from "axios";

import SideDrawer from "./components/shared/SideDrawer";

import ToDoView from "./components/shared/ToDoView";

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
      <SideDrawer />
      <ToDoView todos={todos} />
    </div>
  );
}

export default App;
