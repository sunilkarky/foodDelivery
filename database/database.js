const mongoose = require("mongoose");

const adminSeeding = require("../adminSeeding");
const catchAsync = require("../services/catchAsync");
// connect to database
exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error in connecting to database" + error);
  }

  // admin seeding
  catchAsync(adminSeeding());
};
