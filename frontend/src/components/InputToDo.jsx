import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const InputToDo = ({ setShowToDoForm, setTodos }) => {
  const [input, setInput] = useState("");
  const inputElement = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const fetchTodosData = async () => {
    // fetching todos API call
    try {
      const res = await axios.get("/getToDos");
      setTodos(res.data.Todos.reverse());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const data = {
      title: input,
    };

    // create ToDo API call
    await axios
      .post("/createToDo", data)
      .then(() => {
        setShowToDoForm(false);
        fetchTodosData();
        alert("To Do Saved Successfully");
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
