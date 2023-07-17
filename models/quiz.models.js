const mongoose = require("mongoose");


const quizSchema = mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: { type: String, require: true },
  description: { type: String, require: true },
  question: [
    {
      title: { type: String, require: true },
      answerOptions: [{ type: String, require: true }],
      correctOptions: [{ type: Number, require: true }],
    },
  ],
  leaderboard: [
    {
      email: { type: String, require: true },
      score: { type: Number, require: true },
    }
  ],
});

const QuizModel = mongoose.model("quiz",quizSchema)

module.exports = {QuizModel}