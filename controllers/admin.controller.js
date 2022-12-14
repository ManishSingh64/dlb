const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ADMIN = require("../Schema/admin.schema");

const adminController = express.Router();

adminController.post("/register", async (req, res) => {
  const { email, password } = req.body;
  await bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.status(511).send("try again");
    }
    const user = await ADMIN.create({ email, password: hash });
    return res
      .status(201)
      .send({ message: "Resgistration successful", user: user });
  });
});

adminController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await ADMIN.findOne({ email });
  if (!user) {
    return res.status(404).send("Please Register");
  }
  const hashed_pass = user.password;

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

module.exports = adminController;
