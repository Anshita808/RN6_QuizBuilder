const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    quizzes:[{type:mongoose.Schema.Types.ObjectId,ref:"quiz"}]
})

const UserModel = mongoose.model("user",UserSchema);

module.exports = {UserModel}