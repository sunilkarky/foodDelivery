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

//THis is second way to make model schema without reference to product id
// we do this by passing this review next schema directly to product model by
// passing schema directly in that field
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reviewNextWay = new Schema({
//   userId: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: [true, "A review must belong to user"],
//   },
//   rating: {
//     type: Number,
//     default: 3,
//   },
//   message: {
//     type: String,
//     required: [true],
//   },
// });

// const Review = mongoose.model("Review", reviewNextWay);
// module.exports = {
//   Review,
//   reviewNextWay,
// };
