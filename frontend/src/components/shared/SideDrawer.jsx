import React from "react";
import ToDoList from "../ToDoList";

const SideDrawer = () => {
  return (
    <div className="min-w-[25%] h-screen overflow-y-auto no-scrollbar">
      <ToDoList />
    </div>
  );
};

export default SideDrawer;
