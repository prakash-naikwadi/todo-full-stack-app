import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import Card from "../components/shared/Card";

const TasksPage = ({ todos, fetchTodosData }) => {
  const { todoId } = useParams();

  const [taskInput, setTaskInput] = useState("");

  const todo = todos.find((todo) => {
    return todo._id === todoId;
  });

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
    <div className="min-w-[60%] md:min-w-[75%] bg-gray-200  h-screen overflow-y-auto no-scrollbar">
      <div className="flex justify-between">
        <h2>{todo ? todo.title : null}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={taskInput} />
          <button type="submit">Add Task</button>
        </form>
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        {todo
          ? todo.tasks.map((task) => <Card key={task._id} task={task} />)
          : null}
        {todo ? todo.tasks.length <= 0 && <p>No Tasks Found</p> : null}
      </div>
    </div>
  );
};

export default TasksPage;
