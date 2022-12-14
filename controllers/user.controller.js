const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const USER = require("../Schema/user.schema");

const userController = express.Router();

userController.post("/register", async (req, res) => {
  const { email, password } = req.body;
  await bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.status(511).send("try again");
    }
    const user = await USER.create({ email, password: hash });
    return res
      .status(201)
      .send({ message: "Resgistration successful", user: user });
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });
  console.log(user)
  if (!user) {
    return res.status(200).send("Please Register");
  }
  const hashed_pass = user.password;
  console.log(hashed_pass)
  await bcrypt.compare(password, hashed_pass, function (err, result) {
    if (err) {
      return res.status(511).send("please try again");
    }
    if (result) {
      const token = jwt.sign(
        { email: user.email, adminId: user._id },
        process.env.TOKEN_KEY
      );
      return res.send({
        message: "login successful",
        token: token,
        email: email,
        name: email,
      });
    } else {
      return res.send("Invalid crendentials");
    }
  });
});

module.exports = userController;
