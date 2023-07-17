const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    quizzes:[{type:mongoose.Schema.Types.ObjectId,ref:"quiz"}]
})

const UserModel = mongoose.model("user",userSchema);

module.exports = {UserModel}