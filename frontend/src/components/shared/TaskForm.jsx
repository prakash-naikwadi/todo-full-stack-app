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
    <form onSubmit={handleSubmit} className="flex gap-2 ">
      <input
        type="text"
        className="border-2 border-gray-50 rounded  md:w-[380px] outline-1	outline-offset-0	outline-gray-200	"
        onChange={handleChange}
        value={taskInput}
      />
      <button
        type="submit"
        className="font-medium outline-1	outline-offset-0	outline-gray-200	"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
