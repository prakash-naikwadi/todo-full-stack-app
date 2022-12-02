import React from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import "../../index.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ToDoListItem = ({
  title,
  _id,
  todos,
  todo,
  setTodos,
  fetchTodosData,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(title);
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const handleDelete = async () => {
    let text = "Do You really want to delete";

    // delete todo api call
    if (window.confirm(text)) {
      await axios.delete(`/deleteTodo/${_id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const newTodos = todos.filter((todo) => {
        return todo._id !== _id;
      });
      // console.log(newTodos);
      setTodos(newTodos);

      navigate("/");
    }
  };

  const handleEdit = () => {
    setEditMode((prev) => !prev);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSave = async () => {
    const data = {
      title: input,
    };
    // console.log(data);

    // update to do API call

    await axios.put(`/updateToDo/${_id}`, data, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    setEditMode(false);
    fetchTodosData();
  };

  return (
    <NavLink to={`/${_id}/tasks`}>
      <li className="flex justify-between p-2 hover:bg-gray-200 cursor-pointer">
        {!editMode ? (
          <div>
            <p className="font-medium text-lg">{input}</p>
            <p className="text-xs font-medium">R:{todo.length}</p>
          </div>
        ) : (
          <input
            type="text"
            placeholder="Add To Do Name"
            value={input}
            onChange={handleChange}
          />
        )}

        {editMode ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleDelete}>
              <FontAwesomeIcon
                icon={faTrash}
                className="text-gray-500 hover:text-[#de4573] "
              />
            </button>
            <button onClick={handleEdit}>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-[#1560bd] hover:text-blue-500 font-bold"
              />
            </button>
          </div>
        )}
      </li>
    </NavLink>
  );
};

export default ToDoListItem;
