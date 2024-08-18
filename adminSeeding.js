const User = require("./model/userModel");
const bcrypt = require("bcrypt");

const adminSeeding = async (req, res) => {
  //check if admin already exist or not
  const adminExists = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!adminExists) {
    //admin seeding
    await User.create({
      userName: "admin",
      userEmail: "admin@gmail.com",
      userPassword: bcrypt.hashSync("admin", 10),
      userPhoneNumber: "9811317964",
      role: "admin",
    });
    await User.create({
      userName: "admin1",
      userEmail: "admin1@gmail.com",
      userPassword: bcrypt.hashSync("admin1", 10),
      userPhoneNumber: "9811317964",
      role: "admin",
    });
    console.log("Admin seeding successful");
  } else {
    console.log("Admin already seeded");
  }
};

module.exports = adminSeeding;
