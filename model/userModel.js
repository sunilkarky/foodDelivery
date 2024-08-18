const mongoose = require("mongoose");
const schema = mongoose.Schema;

//user schema

const userSchema = new schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    userEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    userPassword: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // query garda password nadekhaune if needed we can use select while query  await .....  .select("+userPassword")
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
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// const User = mongoose.models.user || mongoose.model("user", userSchema); //FIRST COndition check if the user model already exist copilot
const User = mongoose.model("User", userSchema); //FIRST COndition check if the user model already exist copilot
module.exports = User;
