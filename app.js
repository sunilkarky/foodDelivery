const express = require("express");
const { connectDatabase } = require("./database/database");
const { model } = require("mongoose");
const User = require("./database/MODEL/USERMODEL.JS");
const app = express();

//bcrypt for password hashing
const bcrypt = require("bcrypt");

//token of jwt
const jwt = require("jsonwebtoken");

//dotenv for environment variables
require("dotenv").config();

//to resolve undefined req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
connectDatabase();

//test for api
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Test run",
  });
});

//create a new user
app.post("/register", async (req, res) => {
  console.log(req.body);
  const { name, email, password, phoneNumber } = req.body;

  if (!email || !password || !phoneNumber || !name) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }
  //check if userEmail already exists
  const userEmailFound = await User.find({ userEmail: email });
  if (userEmailFound.length > 0) {
    return res.status(400).json({
      message: "user with Email already exists",
    });
  }

  await User.create({
    userName: name,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
    userPhoneNumber: phoneNumber,
  });

  res.status(201).json({
    message: "User registered successfully",
  });
});

//login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }
  //check if user with given email exists
  const userFound = await User.find({ userEmail: email }); //array return
  if (userFound.length == 0) {
    return res.status(400).json({
      message: "User with that email doesn't exist",
    });
  }
  const matchPassword = bcrypt.compareSync(password, userFound[0].userPassword);
  if (matchPassword) {
    //give token after email and password verified
    const token = jwt.sign(
      { id: userFound[0]._id },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    console.log(token);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } else {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }
});

// listen for server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
