const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//user reviews  userId , productId , rating , message

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "A review must belong to user"],
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, " A review must be of a product"],
  },
  rating: {
    type: Number,
    default: 3,
  },
  message: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

//suruma model banaune ani controller ma kasko lagi model banako tye aanusar
//kam garney ani route ma routinf and import route to app.js
