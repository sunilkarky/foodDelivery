const mongoose = require("mongoose");

// connect to database
exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error in connecting to database" + error);
  }
};
