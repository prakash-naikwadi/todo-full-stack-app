import React from "react";
import Card from "./Card";

import "./removeScrollbar.css";

const ToDoView = ({ todos }) => {
  return (
    <div className="min-w-[75%] bg-gray-200  h-screen overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-bold">To Do Name</h2>
      <button>Create Task</button>
      <div className="flex flex-wrap gap-2 p-2">
        {todos.map((todo) => {
          return <Card description={todo.tasks[0].description} />;
          // console.log(todo.tasks[0].description);
        })}
      </div>
    </div>
  );
};

export default ToDoView;
