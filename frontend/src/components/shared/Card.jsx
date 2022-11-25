import React from "react";

const Card = (props) => {
  return (
    <div className="bg-white dark:bg-gray-800 w-72 shadow-lg rounded-xl p-4">
      <p className="text-gray-600 dark:text-white">
        <span className="font-bold text-indigo-500 text-lg">“</span>
        {props.description}
        <span className="font-bold text-indigo-500 text-lg">”</span>
      </p>
      <div className="flex justify-end gap-2">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Card;
