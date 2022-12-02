const mongoose = require("mongoose");
const ToDo = require("../models/ToDo");

const User = require("../models/user");

exports.home = (req, res) => {
  res.send("Hello World");
};

// -------------------------------

// ToDos

// Get all the todos

exports.getToDos = async (req, res) => {
  try {
    const userId = req.userData.userId;

    let userWithTodos = await User.findById(userId).populate("todos");

    if (!userWithTodos) {
      const error = new Error("User not Found");
      throw error;
    }
    // const Todos = await ToDo.find().populate("user");

    userWithTodos.password = "";

    res.status(201).json({
      success: true,
      message: "Records Fetched Successfully",
      userWithTodos,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create To Do

exports.createToDo = async (req, res) => {
  try {
    const { title } = req.body;

    console.log(req.body);

    //check if todo exists or not
    // const todoExists = await ToDo.findOne({ title });

    // if (todoExists) {
    //   res.status(409).json({
    //     success: false,
    //     message: "To Do Already Exists",
    //   });
    //   const error = new Error("To Do Already Exists");
    //   throw error;
    // }

    // Inserting into the Database
    // const todo = await ToDo.create({ title, user: req.user });
    const createTodo = new ToDo({
      title,
      user: req.userData.userId,
    });

    // Insert logic for user id is existed or not or throw error

    let userExisted;
    try {
      userExisted = await User.findById(req.userData.userId);
    } catch (err) {
      const error = new Error("Creating place failed, please try again.", 500);
      throw error;
    }

    if (!userExisted) {
      const error = new Error("Could not find user for provided id.", 404);
      throw error;
    }

    // console.log(userExisted);

    // await createTodo.save();

    await createTodo.save();
    const createdToDoId = await ToDo.findOne({ title });
    userExisted.todos.push(createdToDoId);
    await userExisted.save();

    res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      createTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error?.errors?.title?.message,
    });
  }
};

// update todo

exports.updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { title } = req.body;

    const updatedToDo = await ToDo.findByIdAndUpdate(id, { title });

    res.status(201).json({
      success: true,
      message: "Todo Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Todo Not Updated",
    });
  }
};

// delete todo

exports.deleteToDo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const toDoDeleteStatus = await ToDo.findByIdAndDelete(todoId);
    // console.log(toDoDeleteStatus);
    if (!toDoDeleteStatus) {
      const error = new Error("To Do Not Found");
      throw error;
    }
    res.status(201).json({
      success: true,
      message: "ToDo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Not Deleted " + error,
    });
  }
};

// get todos in ascending order
exports.sortAscTimeStamp = async (req, res) => {
  try {
    // const sortedData = await ToDo.find().sort({
    //   createdAt: 1,
    // });

    const userId = req.userData.userId;
    // console.log(userId);

    let sortedData = await User.findById(userId)
      .find()
      .populate({ path: "todos", options: { sort: { title: 1 } } });

    sortedData[0].password = "";

    res.status(201).json({
      success: true,
      message: "Sorted Todos in Ascending Order  Successfully",
      sortedData: sortedData[0],
    });
  } catch (error) {
    console.log(error);
  }
};

// get todos in descending order

exports.sortDescTimeStamp = async (req, res) => {
  try {
    // const sortedData = await ToDo.find().sort({
    //   createdAt: -1,
    // });

    const userId = req.userData.userId;

    let sortedData = await User.findById(userId)
      .find()
      .populate({ path: "todos", options: { sort: { title: -1 } } });

    sortedData[0].password = "";

    res.status(201).json({
      success: true,
      message: "Sorted Todos in Descending Order  Successfully",
      sortedData: sortedData[0],
    });
  } catch (error) {
    console.log(error);
  }
};

// -------------------------------

// Task

// Create To Do Tasks

exports.createToDoTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const tasks = req.body;

    //check if todo exists or not
    const foundtodo = await ToDo.findOne({ _id: todoId });

    if (foundtodo) {
      await foundtodo.tasks.push(tasks);

      await foundtodo.save();

      res.status(201).json({
        success: true,
        message: "Task Added Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error?.errors["tasks.3.description"]?.message,
    });
  }
};

// update todo task

exports.updateTodoTask = async (req, res) => {
  try {
    const taskId = req.params.todoTaskId;
    const todoId = req.params.todoId;
    const { description } = req.body;

    const ToDoTask = await ToDo.findById(todoId);

    const task = ToDoTask.tasks.find((item) => {
      return item._id.toString() === taskId;
    });
    // console.log(task._id);

    task.description = description;

    ToDoTask.save();

    res.status(201).json({
      success: true,
      message: "Task Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Task Not Updated",
    });
  }
};

// delete specific task from specific Todo

exports.deleteTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todoTaskId = req.params.id;

    // Finding Specific Todo from which we want to delete the task
    const ToDoTask = await ToDo.findById(todoId);

    // removing that specific task from TODo
    await ToDoTask.tasks.pull({ _id: todoTaskId });

    await ToDoTask.save();

    res.status(201).json({
      success: true,
      message: "ToDo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Not Deleted",
    });
  }
};
