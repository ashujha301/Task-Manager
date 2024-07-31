const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  userReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER" //reference to user model
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
    default: "To Do",
  },
},
{ timestamps: true }
);

const TASK = new mongoose.model("TASK", taskSchema);

module.exports = TASK;
