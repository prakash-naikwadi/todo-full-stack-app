import React, { useContext } from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import EditTaskModal from "../modals/EditTaskModal";
import AuthContext from "../context/AuthContext";

const Card = ({ task, todoId, setTodoState, todoState, fetchTodosData }) => {
  const [isedit, setIsEdit] = useState(false);
  const auth = useContext(AuthContext);

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleDelete = async () => {
    const text = "Do You Really Want To Delete?";
    if (window.confirm(text)) {
      await axios.delete(`/${todoId}/deleteTask/${task._id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const newTodoState = todoState.tasks.filter((item) => {
        return item._id !== task._id;
      });
      setTodoState((prev) => ({ ...prev, tasks: newTodoState }));
      fetchTodosData();
      // console.log(newTodoState);
    }
  };

  const handleSaveTask = async (newTaskDescription) => {
    const data = {
      description: newTaskDescription,
    };

    await axios.put(`/${todoId}/${task._id}`, data, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    const taskIndex = todoState.tasks.findIndex((item) => {
      return item._id === task._id;
    });

    setTodoState((prev) => {
      const oldTasks = [...prev.tasks];
      oldTasks[taskIndex].description = newTaskDescription;
      return {
        ...prev,
        tasks: oldTasks,
      };
    });

    setIsEdit(false);
  };

  return (
    <div className="flex flex-col	justify-between bg-white dark:bg-gray-800 w-72 shadow-lg rounded-xl p-4">
      {/* Edit Task modal */}
      {isedit && (
        <EditTaskModal setIsEdit={setIsEdit} handleSaveTask={handleSaveTask} />
      )}

      <p className="text-gray-600 dark:text-white">
        <span className="font-bold text-indigo-500 text-lg">“</span>
        {task.description}
        <span className="font-bold text-indigo-500 text-lg">”</span>
      </p>
      <div className="flex justify-end gap-2">
        <button onClick={handleEdit}>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="text-[#1560bd] hover:text-blue-500 font-bold"
          />
        </button>
        <button onClick={handleDelete}>
          <FontAwesomeIcon
            icon={faTrash}
            className="text-gray-500 hover:text-[#de4573] "
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
