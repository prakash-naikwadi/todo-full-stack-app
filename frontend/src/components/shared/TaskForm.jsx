import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ fetchTodosData, todoId }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description: taskInput,
    };
    await axios.post(`/${todoId}/createToDoTask`, data);
    setTaskInput("");
    fetchTodosData();
  };

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} value={taskInput} />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
