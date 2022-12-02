import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const TaskForm = ({ fetchTodosData, todoId }) => {
  const [taskInput, setTaskInput] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      description: taskInput,
    };
    await axios
      .post(`/${todoId}/createToDoTask`, data, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then(() => {
        setTaskInput("");
        fetchTodosData();
        alert("Saved Successfully");
      })
      .catch((res) => {
        alert(res.response.data.message);
      });
  };

  const handleChange = (e) => {
    setTaskInput(e.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap	justify-center md:justify-start gap-2 "
    >
      <input
        type="text"
        className="border-2 border-gray-50 rounded  md:w-[380px] outline-1	outline-offset-0	outline-gray-200	"
        onChange={handleChange}
        value={taskInput}
      />
      <button
        type="submit"
        className="font-medium outline-1	outline-offset-0	outline-gray-200	text-[#1560bd] hover:text-blue-500"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
