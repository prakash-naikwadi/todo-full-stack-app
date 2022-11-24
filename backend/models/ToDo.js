const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: String,
  tasks: [{ description: String }],
});

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
