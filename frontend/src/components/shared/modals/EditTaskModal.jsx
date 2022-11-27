import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

import ReactDOM from "react-dom";

const ModalOverlay = (props) => {
  const [input, setInput] = useState("");
  const inputElementRef = useRef();

  useEffect(() => {
    inputElementRef.current.focus();
  }, []);

  const handleClose = () => {
    props.setIsEdit(false);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSaveTask(input);
  };

  const content = (
    <div className="flex justify-center	items-center absolute bg-gray-200 left-0 top-0 bottom-0 right-0 opacity-60 z-50">
      <div className="flex justify-center	items-center relative bg-[#fff] h-[200px] w-[400px]">
        <button className="absolute top-0 right-2" onClick={handleClose}>
          X
        </button>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-2 border-gray-500"
            onChange={handleChange}
            value={input}
            ref={inputElementRef}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("edit-task-hook")
  );
};

const EditTaskModal = (props) => {
  return (
    <>
      <ModalOverlay {...props} />
    </>
  );
};

export default EditTaskModal;
