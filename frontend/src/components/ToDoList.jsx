import React, { useEffect, useState } from "react";
import ToDoListItem from "./ToDoListItem";

import axios from "axios";
import InputToDo from "./InputToDo";
import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
        <div className="flex justify-between items-center	">
          <h2 className="font-bold text-lg">TO-DO</h2>
          <div>
            {showToDoForm ? null : (
              <button onClick={handleAdd} className="text-lg">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="hover:text-gray-100"
                  style={{ color: "gray" }}
                />
              </button>
            )}
          </div>
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
