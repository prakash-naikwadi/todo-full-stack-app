const express = require("express");

const checkAuth = require("../middleware/checkAuth.js");

const {
  createToDo,
  home,
  getToDos,
  createToDoTask,
  updateTodo,
  updateTodoTask,
  deleteToDo,
  deleteTask,
  sortDescTimeStamp,
  sortAscTimeStamp,
} = require("../controllers/toDoControllers");

const router = express.Router();

router.get("/", home);

router.use(checkAuth);

// todos routes
router.get("/getToDos", getToDos);
router.post("/createToDo", createToDo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteToDo);

// sort todo route
router.get("/getToDos/sort/des", sortDescTimeStamp);
router.get("/getToDos/sort/asc", sortAscTimeStamp);

// tasks routes
router.post("/:todoId/createToDoTask", createToDoTask);
router.put("/:todoId/:todoTaskId", updateTodoTask);
router.delete("/:todoId/deleteTask/:id", deleteTask);

module.exports = router;
