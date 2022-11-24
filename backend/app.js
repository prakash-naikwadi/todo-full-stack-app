require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");

const todosRoutes = require("./routes/todosRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();
app.use("/", todosRoutes);

module.exports = app;
