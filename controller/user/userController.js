const Product = require("../../model/productModel");
const Review = require("../../model/reviewModel");
const User = require("../../model/userModel");

exports.createReview = async (req, res) => {
  const userId = req.user.id;
  const { rating, message } = req.body;
  const productId = req.params.id;

  if (!rating || !message || !productId) {
    return res.status(400).json({
      message: "Please provide rating message and productId",
    });
  }
  //check if that product exists in first place then only we can review
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res.status(400).json({
      message: "Product with that id is not found",
    });
  }

  await Review.create({
    userId,
    productId,
    rating,
    message,
  });
  res.status(200).json({
    message: "Review successfully recorded",
  });
};
//get all reviews by that user
exports.getProductReview = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(200).json({
      message: " Please provide product Id",
    });
  }
  const productExists = await Product.findById(productId);
  if (!productExists) {
    return res.status(400).json({
      message: "Product with that id is not found",
    });
  }
  const reviews = await Review.find({ productId: productId }).populate({
    path: "userId",
    select: "userName userEmail",
  });
  // .populate({
  //   path: "productId",
  // });
  // console.log(reviews);
  if (reviews.length == 0) {
    return res.status(400).json({
      message: "No any reviews yet",
    });
  }
  res.status(200).json({
    message: "Reviews Fetched success",
    data: reviews,
  });
};
//delete reviews

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.id;
  const userId = req.user.id;
  if (!reviewId) {
    return res.status(400).json({
      message: " Please provide review id",
    });
  }
  const reviewExists = await Review.findById(reviewId);
  if (!reviewExists) {
    return res.status(400).json({
      message: "Review with that id is not found",
    });
  }
  const reviewedUserId = reviewExists.userId.toString();
  const loginUserId = req.user.id;
  if (reviewedUserId !== loginUserId) {
    //only that reviewed user can delete that review
    console.log(reviewedUserId, loginUserId);
    return res.status(400).json({
      message: "You are not authorizes to delete other user reviews",
    });
  }

  const deletedReview = await Review.findByIdAndDelete(reviewId);
  res.status(200).json({
    message: "Deleted Successfully",
    data: deletedReview,
  });
};
