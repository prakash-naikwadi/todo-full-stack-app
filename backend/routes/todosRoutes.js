const express = require("express");

const {
  createToDo,
  home,
  getToDos,
  createToDoTask,
  updateTodo,
  updateTodoTask,
} = require("../controllers/toDoControllers");

const router = express.Router();

router.get("/", home);
router.get("/getToDos", getToDos);
router.post("/createToDo", createToDo);
router.put("/updateTodo/:id", updateTodo);
router.post("/:todoId/createToDoTask", createToDoTask);
router.put("/:todoId/:todoTaskId", updateTodoTask);

module.exports = router;
