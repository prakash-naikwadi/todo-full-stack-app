import React, { useState } from "react";
import ToDoListItem from "./ToDoListItem";

import InputToDo from "./InputToDo";
import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ToDoList = ({ todos, setTodos, fetchTodosData }) => {
  const [showToDoForm, setShowToDoForm] = useState(false);
  let elementReference = useRef();

  const handleAdd = () => {
    setShowToDoForm((prev) => !prev);
  };

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center	">
          <h2 className="font-bold text-lg ">TO-DO</h2>
          <div>
            {showToDoForm ? null : (
              <button onClick={handleAdd} className="text-lg">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[#1560bd] hover:text-blue-500 font-bold"
                />
              </button>
            )}
          </div>
        </div>
        <ul className="mt-4">
          {showToDoForm && (
            <InputToDo
              forwardRef={elementReference}
              setTodos={setTodos}
              setShowToDoForm={setShowToDoForm}
            />
          )}

          {todos.map((todo) => (
            <ToDoListItem
              key={todo._id}
              todo={todo}
              {...todo}
              todos={todos}
              setTodos={setTodos}
              fetchTodosData={fetchTodosData}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
