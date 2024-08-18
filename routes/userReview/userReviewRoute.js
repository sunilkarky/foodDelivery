const {
  getProductReview,
  createReview,
  deleteReview,
} = require("../../controller/user/userController");

const isAuthenticated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

// router.route("/reviews")
router
  .route("/review/:id")
  .get(isAuthenticated, catchAsync(getProductReview))
  .post(isAuthenticated, catchAsync(createReview))
  .delete(isAuthenticated, catchAsync(deleteReview));
module.exports = router;
