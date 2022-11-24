const express = require("express");

const {
  createToDo,
  home,
  getToDos,
  createToDoTask,
  updateTodo,
  updateTodoTask,
  deleteToDo,
  deleteTask,
} = require("../controllers/toDoControllers");

const router = express.Router();

router.get("/", home);

// todos routes
router.get("/getToDos", getToDos);
router.post("/createToDo", createToDo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteToDo);

// tasks routes
router.post("/:todoId/createToDoTask", createToDoTask);
router.put("/:todoId/:todoTaskId", updateTodoTask);
router.delete("/:todoId/deleteTask/:id", deleteTask);

module.exports = router;
