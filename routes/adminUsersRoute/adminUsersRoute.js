const {
  getUsers,
  deleteUser,
  getUser,
} = require("../../controller/admin/users/userController");
const checkRoles = require("../../middleware/checkRoles");
const isAuthenticated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const router = require("express").Router();

router
  .route("/users")
  .get(isAuthenticated, checkRoles("admin"), catchAsync(getUsers));

router
  .route("/users/:id")
  .delete(isAuthenticated, checkRoles("admin"), catchAsync(deleteUser))
  .get(isAuthenticated, checkRoles("admin"), catchAsync(getUser));

module.exports = router;
