import React, { useEffect, useState } from "react";
import ToDoListItem from "./ToDoListItem";

import axios from "axios";
import InputToDo from "./InputToDo";
import { useRef } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [showToDoForm, setShowToDoForm] = useState(false);
  let elementReference = useRef();

  const fetchTodosData = async () => {
    // fetching todos API call
    const res = await axios.get("/getToDos");
    setTodos(res.data.Todos);
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  const handleAdd = () => {
    setShowToDoForm((prev) => !prev);
  };

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between">
          <h2>TO-DO</h2>
          {showToDoForm ? "Add" : <button onClick={handleAdd}>Add</button>}
        </div>
        <ul>
          {showToDoForm && (
            <InputToDo
              forwardRef={elementReference}
              setTodos={setTodos}
              setShowToDoForm={setShowToDoForm}
              fetchTodosData={fetchTodosData}
            />
          )}

          {todos.map((todo) => (
            <ToDoListItem
              key={todo._id}
              {...todo}
              todos={todos}
              setTodos={setTodos}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
