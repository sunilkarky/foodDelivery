const mongoose = require("mongoose");
const schema = mongoose.Schema;

// product model

const productSchema = new schema({
  productName: {
    type: String,
    require: [true, "Product Name is required"],
  },
  productDescription: {
    type: String,
    require: [true, " Product Description is required"],
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
  },
  productStockQty: {
    type: Number,
    required: [true, "Product Stock Quantity is required"],
  },
  productStatus: {
    type: String,
    enum: ["draft", "public"],
  },
  productImage :{
    type : String,
  
  }
},{
    timestamps : true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
