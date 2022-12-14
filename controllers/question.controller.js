const express = require("express");
const QUESTION = require("../Schema/question.schema");
const questionController = express.Router();

questionController.get("/", async (req, res) => {
  const data = await QUESTION.find();

  res.status(200).send(data);
});

questionController.get("/:id/:difficulty", async (req, res) => {
  const { id, difficulty } = req.params;
  const data = await QUESTION.find({
    $and: [{ difficulty: difficulty }, { AdminId: id }],
  });

  res.status(200).send(data);
});

questionController.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await QUESTION.find({ AdminId: id });

  res.status(200).send(data);
});

questionController.post("/create", async (req, res) => {
  const { question, difficulty, options, correct, AdminId } = req.body;
  const allQuestions = await QUESTION.find({ AdminId });
  if (allQuestions.length == 10) {
    return res
      .status(200)
      .send("Please Create New Id , You Have Added 10 Questions");
  } else {
    const data = await QUESTION.create({
      question,
      difficulty,
      options,
      correct,
      AdminId,
    });
  }
  res.status(200).send("Question Added");
});

module.exports = questionController;
