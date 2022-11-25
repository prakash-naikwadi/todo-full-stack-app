import React from "react";
import axios from "axios";
import { useState } from "react";

const ToDoListItem = ({ title, _id, todos, setTodos }) => {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState(title);

  const handleDelete = async () => {
    let text = "Do You really want to delete";

    // delete todo api call
    if (window.confirm(text)) {
      await axios.delete(`/deleteTodo/${_id}`);
      const newTodos = todos.filter((todo) => {
        return todo._id !== _id;
      });
      console.log(newTodos);
      setTodos(newTodos);
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
    console.log(data);

    // update to do API call

    await axios.put(`/updateToDo/${_id}`, data);
    setEditMode(false);
  };

  return (
    <li className="flex justify-between p-2 hover:bg-gray-200 cursor-pointer">
      {!editMode ? (
        <p>{input}</p>
      ) : (
        <input
          type="text"
          placeholder="Add To Do Name"
          value={input}
          onChange={handleChange}
        />
      )}
      {/* <p>{title}</p> */}
      {/* <input type="text" placeholder="Add To Do Name" value={title} readOnly /> */}
      {editMode ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <div className="flex gap-2">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </li>
  );
};

export default ToDoListItem;
