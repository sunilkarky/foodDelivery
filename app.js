const express = require("express");
const { connectDatabase } = require("./database/database");
const { model } = require("mongoose");
const app = express();

const { registerUser, loginUser } = require("./controller/auth/authController");

//Routes here
const authRoute = require("./routes/auth/authRoutes");
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
//we have route in different folder
// //create a new user
// app.post("/register", registerUser);

// //login User
// app.post("/login", loginUser);

//use auth route imported
app.use("",authRoute)

// listen for server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
