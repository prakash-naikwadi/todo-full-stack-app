import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const InputToDo = ({ setShowToDoForm, setTodos, fetchTodosData }) => {
  const [input, setInput] = useState("");

  const inputElement = useRef();

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const handleSave = async () => {
    const data = {
      title: input,
      _id: uuid(),
    };

    // create ToDo API call

    await axios
      .post("/createToDo", data)
      .then(() => {
        alert("To Do Saved Successfully");
        setTodos((prev) => [...prev, data]);
        setShowToDoForm(false);
        fetchTodosData();
      })
      .catch((res) => {
        alert(res.response.data.message);
      });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSetShow = () => {
    setShowToDoForm((prev) => !prev);
  };
  return (
    <li className="flex justify-between p-2 hover:bg-gray-200 cursor-pointer">
      <input
        type="text"
        placeholder="Add To Do Name"
        value={input}
        onChange={handleChange}
        ref={inputElement}
      />
      <div className="flex items-center	 gap-3">
        <button onClick={handleSave} className="flex items-center">
          Save
        </button>
        <button onClick={handleSetShow}>
          <FontAwesomeIcon
            icon={faXmark}
            className="hover:text-gray-100"
            style={{ color: "gray" }}
          />
        </button>
      </div>
    </li>
  );
};

export default InputToDo;
