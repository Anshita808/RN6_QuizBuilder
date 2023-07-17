const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const { userRoute } = require("./routes/user.routes");
const app = express();

app.use(express.json())
app.use(cors())
app.use("/user",userRoute)


app.listen(process.env.PORT,async()=>{
try {
    await connection
    console.log("db is connected")
} catch (error) {
    console.log(error)
}

console.log("server is running")
})