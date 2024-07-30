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
},
{ timestamps: true }
);

const CODE = new mongoose.model("CODE", codeSchema);

module.exports = CODE;
