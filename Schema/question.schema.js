const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  difficulty: { type: Number, required: true },
  options: { type: Array, required: true },
  correct: { type: Array, required: true },
  AdminId: { type: String, required: true },
});

const QUESTION = mongoose.model("question", questionSchema);
module.exports = QUESTION;
