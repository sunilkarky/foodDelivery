const mongoose = require("mongoose");
const schema = mongoose.Schema;

//user schema

const userSchema = new schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    userEmail: {
      type: String,
      required: [true, "Email is required"],
    },
    userPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    userPhoneNumber: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.user || mongoose.model("user", userSchema); //FIRST COndition check if the user model already exist copilot
module.exports = User;
