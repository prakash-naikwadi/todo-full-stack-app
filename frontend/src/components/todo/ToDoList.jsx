import React, { useState } from "react";
import ToDoListItem from "./ToDoListItem";

import InputToDo from "./InputToDo";
import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ToDoList = ({ todos, setTodos, fetchTodosData }) => {
  const [showToDoForm, setShowToDoForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("des");

  const auth = useContext(AuthContext);

  console.log(typeof todos, "Prakash");
  console.log(todos.todos, "Prakash");

  let elementReference = useRef();

  const handleAdd = () => {
    setShowToDoForm((prev) => !prev);
  };

  const handleRadioChange = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const fetchData = async (sort) => {
      const res = await axios.get(`/getToDos/sort/${sort}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log(res);
      setTodos(res.data.sortedData.todos);
    };
    fetchData(selectedOption);
  }, [selectedOption, setTodos, auth.token]);

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
        <div className="flex justify-end">
          <div className="mr-2">
            <label htmlFor="flexRadioDefault10">Asc</label>
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault10"
              value="asc"
              checked={selectedOption === "asc"}
              onChange={handleRadioChange}
            />
          </div>
          <div>
            <label htmlFor="flexRadioDefault20">Des</label>
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault20"
              value="des"
              checked={selectedOption === "des"}
              onChange={handleRadioChange}
            />
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
