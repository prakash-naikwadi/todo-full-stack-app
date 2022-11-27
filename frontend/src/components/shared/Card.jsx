import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Card = ({ task, todoId, setTodoState, todoState }) => {
  const handleDelete = async () => {
    await axios.delete(`/${todoId}/deleteTask/${task._id}`);
    const newTodoState = todoState.tasks.filter((item) => {
      return item._id !== task._id;
    });
    setTodoState((prev) => ({ ...prev, tasks: newTodoState }));
    console.log(newTodoState);
  };
  return (
    <div className="flex flex-col	justify-between bg-white dark:bg-gray-800 w-72 shadow-lg rounded-xl p-4">
      <p className="text-gray-600 dark:text-white">
        <span className="font-bold text-indigo-500 text-lg">“</span>
        {task.description}
        <span className="font-bold text-indigo-500 text-lg">”</span>
      </p>
      <div className="flex justify-end gap-2">
        <button>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="hover:text-gray-100"
            style={{ color: "gray" }}
          />
        </button>
        <button onClick={handleDelete}>
          <FontAwesomeIcon
            icon={faTrash}
            className="hover:text-gray-100"
            style={{ color: "gray" }}
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
