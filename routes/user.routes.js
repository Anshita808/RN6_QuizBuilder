const express = require("express");
const { UserModel } = require("../models/user.models");
const { QuizModel } = require("../models/quiz.models");

const UserRouter = express.Router();

UserRouter.post("/register",async(req,res)=>{
    const {username,email} = req.body;
    try {
        const isUserPresent = await UserModel.findOne({email});
        if(isUserPresent){
            return res.status(301).send({msg:"User Already Present."})
        }
        const newUser = new UserModel({username,email});
        await newUser.save();
        res.status(200).send({msg:"Registration Successfull.",newUser})
    } catch (error) {
        res.send(error);
    }
})

UserRouter.get("/quiz",async(req,res)=>{
  try {
    const getQuiz = await QuizModel.find()
    res.status(201).send(getQuiz)
  } catch (error) {
    res.send(error)
  }
})

// Create a quiz
UserRouter.post("/addquiz", async (req, res) => {
    try {
       const { creator, title, description, question,leaderboard } = req.body;
  
       // Validate the required fields
       if (!creator || !title || !description || !question) {
         return res.status(400).send({ msg: "Missing required fields" });
       }
  
       // Find the user by email
       const user = await UserModel.findOne({ email: creator });
       if (!user) {
         return res.status(404).json({ msg: "Creator not found" });
       }
  
        if (question.length < 2 || question.length > 10) {
          return res
            .status(400)
            .send({ msg: "Number of questions should be between 2 and 10" });
        }
  
       // Create the quiz
       const quiz = new QuizModel({
         creator: user._id,
         title,
         description,
         question,
         leaderboard,
       });
  
       // Save the quiz
       await quiz.save();
  
       // Update the user's quizzes array with the new quiz
       user.quizzes.push(quiz._id);
       await user.save();
  
       res.status(201).send({ msg: "Quiz created successfully", quiz });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the quiz" });
    }
  });
  

module.exports = {UserRouter}