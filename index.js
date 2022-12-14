const express = require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config();
const questionController = require("./controllers/question.controller")
const Authentication = require("./Middleware/Authentication");
const { default: mongoose } = require("mongoose");
const adminController = require("./controllers/admin.controller");

app.use(express.json())
app.get("/",(req,res) => {
    res.send('homepage')
})

app.use('/admin',adminController)
app.use('/question',questionController)

console.log(process.env.PORT)
app.listen(process.env.PORT, async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("connected to Mongoose server");
    } catch (e) {
      console.log("error connecting to Mongoose server");
    }
  });