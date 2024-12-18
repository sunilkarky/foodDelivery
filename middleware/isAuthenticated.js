const User = require("../model/userModel");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const isAuthenticated = async (req, res, next) => {
  //check if user is authenticated (Login)to perform the action
  // login garDako token check
  const token = req.headers.authorization; //pass in postman headers token after login
  //   console.log(token);
  if (!token) {
    return res.status(403).json({
      message: "Please login first to get token",
    });
    7;
  }
  //verify token if it is legit
  //   jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, success) => {
  //     if (err) {
  //       res.status(400).json({
  //             message: "invalid token",
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "token verified",
  //       });
  //     }
  //   });
  //ALTERNATIVE FOR ABOVE (ERR SUCCESS) CALLBACK USING PROMISIFY

  try {
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET_KEY
    );
    const userExists = await User.findOne({ _id: decodedToken.id });
    // console.log(userExists);
    // console.log(decodedToken);
    if (!userExists) {
      return res.status(400).json({
        message: "user with that token/id does not exist ",
      });
    }
    //to send information through route we use
    // req.user= "sunil"
    req.user = userExists; //this is passed to next route function to check roles and authorizations

    next();
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
