const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: mongoose.Types.ObjectId, ref: "Todo" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
