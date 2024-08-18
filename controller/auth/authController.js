const bcrypt = require("bcrypt");

const { model } = require("mongoose");

const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendEmail = require("../../services/sendEmail");
const User = require("../../model/userModel");

exports.registerUser = async (req, res) => {
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
  console.log("hi");
  const userFound = await User.find({ userEmail: email }).select(
    "+userPassword"
  );
  //array return
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

    return res.status(200).json({
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
  console.log(otp);
  //insert otp in database table user to check
  userEmailFound[0].otp = otp;
  await userEmailFound[0].save();

  //function call with object
  sendEmail({
    email: email,
    subject: "Food ordering system Request for OTP",
    message: `Your otp is ${otp}. Don't share this with anyone`,
  });
  res.status(200).json({
    message: "Email sent successfully",
  });
};
//verify otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    //email state bata react bata patahune only otp in ui
    return res.status(400).json({
      message: "please provide email and otp",
    });
  }
  //check if otp matches or not
  const userExist = await User.find({ userEmail: email }).select("+otp");
  if (userExist.length == 0) {
    return res.status(404).json({
      message: "Email is not registered ",
    });
  }

  if (userExist[0].otp !== otp) {
    return res.status(400).json({
      message: "Invalid ! otp not matched",
    });
  }

  // const now = new Date();
  // const expiration_time = AddMinutesToDate(now, 5);
  // console.log(expiration_time);
  // console.log(now);

  //after using otp do not use it aging so disposing
  userExist[0].otp = undefined;
  await userExist[0].save();
  res.status(200).json({
    message: "Otp matched",
  });
};

//reset password

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email newPassword and confirmPassword",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New Password and Confirm Password doesn't match",
    });
  }

  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(400).json({
      message: "Email is not registered",
    });
  }
  userExist[0].userPassword = bcrypt.hashSync(newPassword, 10);
  await userExist[0].save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
