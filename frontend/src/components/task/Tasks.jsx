import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Card from "../shared/Card";

const Tasks = ({ todo, todoId, fetchTodosData }) => {
  const [todoState, setTodoState] = useState(todo);

  useEffect(() => {
    setTodoState(todo);
  }, [todo]);

  return todoState.tasks.map((task) => (
    <Card
      key={task._id}
      task={task}
      todoId={todoId}
      todoState={todoState}
      setTodoState={setTodoState}
      fetchTodosData={fetchTodosData}
    />
  ));
};

export default Tasks;
