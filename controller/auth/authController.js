const User = require("../../database/MODEL/USERMODEL.JS");
const bcrypt = require("bcrypt");

const { model } = require("mongoose");

const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../services/sendEmail");

exports.registerUser = async (req, res) => {
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
};

//login
exports.loginUser = async (req, res) => {
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
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({
      message: "please enter email",
    });
  }
  const userEmailFound = await User.find({ userEmail: email });
  if (userEmailFound.length == 0) {
    return res.status(400).json({
      message: "User with that email doesn't exist",
    });
  }
  //send otp to email
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  sendEmail({
    email: email,
    subject: "Food ordering system Request for OTP",
    message: `Your otp is ${otp}. Don't share this with anyone`,
  });
  res.status(200).json({
    message: "Email sent successfully",
  });
};
