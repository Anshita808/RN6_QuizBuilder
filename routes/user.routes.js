const express = require("express");
const { UserModel } = require("../models/user.model");
const { QuizModel } = require("../models/quiz.models");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { username, email } = req.body;
  try {
    const isUserExit = await UserModel.findOne({ email });
    if (isUserExit) {
      return res.status(301).send({ msg: "user Already register" });
    }

    const newUser = new UserModel({ username, email });
    await newUser.save();
    res.status(200).send({ msg: "register success", newUser });
  } catch (error) {
    res.send(error);
  }
});

userRoute.get("/quiz", async (req, res) => {
  try {
    const quizzes = await QuizModel.find().populate(
      "creator",
      "username email"
    );
    res.status(200).send(quizzes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the quizzes" });
  }
});

// Create a quiz
userRoute.post("/addquiz", async (req, res) => {
  try {
     const { creator, title, description, question, leaderboard } = req.body;

     if (!creator || !title || !description || !question) {
       return res.status(400).send({ msg: "Missing required fields" });
     }


     const user = await UserModel.findOne({ email: creator });
     if (!user) {
       return res.status(404).json({ msg: "Creator not found" });
     }
      //  if (answerOptions.length < 1 || answerOptions.length > 4) {
      //    return res
      //      .status(400)
      //      .json({
      //        error: "Number of answer options should be between 1 and 4",
      //      });
      //  }

      if (question.length < 2 || question.length > 10) {
        return res
          .status(400)
          .send({ msg: "Number of questions should be between 2 and 10" });
      }


     const quiz = new QuizModel({
       creator: user._id,
       title,
       description,
       question,
       leaderboard,
     });


     await quiz.save();


     user.quizzes.push(quiz._id);
     await user.save();

     res.status(201).send({ msg: "Quiz created successfully", quiz });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the quiz" });
  }
});

module.exports = { userRoute };
