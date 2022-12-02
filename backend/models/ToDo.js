const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 25,
    },

    tasks: [
      {
        description: {
          type: String,
          minlength: 1,
          maxlength: 100,
        },
      },
    ],
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("Todo", TodoSchema);

module.exports = TodoModel;
