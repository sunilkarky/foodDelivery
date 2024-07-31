const checkRoles = (...roles) => {
  return (req, res, next) => {
    // console.log(roles); //route ko parameter lai array ma banauxa with ... rest operator
    // console.log(req.user) //isAuthenticated bata aako pass gareko
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: "Forbidden Access to this .Only admin access",
      });
    }
    next();
  };
};

module.exports = checkRoles;
