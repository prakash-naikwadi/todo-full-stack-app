import React from "react";
import ToDoList from "./todo/ToDoList";

const SideDrawer = (props) => {
  return (
    <div className="min-w-[40%] md:min-w-[25%] h-screen overflow-y-auto no-scrollbar p-2">
      <ToDoList {...props} />
    </div>
  );
};

export default SideDrawer;
