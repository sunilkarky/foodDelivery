const User = require("../../../model/userModel");

exports.getUsers = async (req, res) => {
  const { id } = req.user;
  // const users = await User.find().select("+otp"); //.select(["-__v", "+userPassword"]);  utai model bata gardani milxa restrict yata bata pani milxa
  //   // console.log(id);
  //   if (users.length > 1) {
  //     const user = users.filter(
  //       (user) => user.role == "customer" || user.id !== id // from checkroles bata liyakop
  //     );
  //     // console.log(user)

  //     res.status(200).json({
  //       message: "Users fetched success",
  //       data: user,
  //     });

  //next approach
  const users = await User.find({ _id: { $ne: id } }); //this query simply does work
  if (users.length > 1) {
    res.status(200).json({
      message: "Users fetched success",
      data: users,
    });
  } else {
    res.status(200).json({
      message: "No users found",
      data: [],
    });
  }
};

//delete users
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({
      message: "Please provide user id",
    });
  }
  const userExists = await User.findById(id);
  if (!userExists) {
    return res.status(404).json({
      message: "user with that id does not exists",
    });
  }
  const deletedUser = await User.findByIdAndDelete(id);
  res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const userExists = await User.findById(id);
  if (!userExists) {
    return res.status(404).json({
      message: "user with that id does not exists",
    });
  }
  res.status(200).json({
    message: "user details",
    data: userExists,
  });
};
