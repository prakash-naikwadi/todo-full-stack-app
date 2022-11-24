const ToDo = require("../models/ToDo");

exports.home = (req, res) => {
  res.send("Hello World");
};

// Get all the todos

exports.getToDos = async (req, res) => {
  try {
    const Todos = await ToDo.find();

    res.status(201).json({
      success: true,
      message: "Records Fetched Successfully",
      Todos,
    });
  } catch (error) {
    console.log(error);
  }
};

// Create To Do

exports.createToDo = async (req, res) => {
  try {
    const { title, task } = req.body;

    //check if todo exists or not
    const todoExists = await ToDo.findOne({ title });

    if (todoExists) {
      res.status(409).json({
        success: false,
        message: "To Do Already Exists",
      });
      throw new Error("To Do Already Exists");
    }

    // Inserting into the Database
    const todo = await ToDo.create({ title });

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      todo,
    });
  } catch (error) {
    console.log(error);
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

// Create To Do Tasks

exports.createToDoTask = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const tasks = req.body;

    //check if todo exists or not
    const foundtodo = await ToDo.findOne({ _id: todoId });

    console.log(tasks);

    foundtodo.tasks.push(tasks);

    foundtodo.save();

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error While Adding Task",
    });
  }
};

// update todo task

exports.updateTodoTask = async (req, res) => {
  try {
    const id = req.params.todoTaskId;
    const { description } = req.body;

    const updatedToDoTask = await ToDo.findByIdAndUpdate(id, { title });

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
