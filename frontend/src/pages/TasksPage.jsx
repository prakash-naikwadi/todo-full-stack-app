import React from "react";
import { useParams } from "react-router-dom";

import TaskForm from "../components/shared/TaskForm";
import Tasks from "../components/Tasks";

const TasksPage = ({ todos, fetchTodosData }) => {
  const { todoId } = useParams();
  const todo = todos.find((todo) => {
    return todo._id === todoId;
  });

  const capitalize = (text) => {
    const newText = text.charAt(0).toUpperCase() + text.slice(1);
    return newText;
  };
  return (
    <div className="min-w-[60%] md:min-w-[75%] bg-gray-200 p-4 h-screen overflow-y-auto no-scrollbar">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">
          {todo ? capitalize(todo.title) : null}
        </h2>

        <TaskForm
          fetchTodosData={fetchTodosData}
          todos={todos}
          todoId={todoId}
        />
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        {todo ? <Tasks todo={todo} todoId={todoId} /> : null}
        {todo ? todo.tasks.length <= 0 && <p>No Tasks Found</p> : null}
      </div>
    </div>
  );
};

export default TasksPage;