const Product = require("../../../database/model/productModel");

exports.createProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productStockQty,
    productStatus,
  } = req.body;
  const file = req.file;
  // console.log(req.file); //form data bata pathane in postman

  if (!file) {
    return res.status(400).json({
      message: "Please provide productImage",
    });
  }
  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStatus ||
    !productStockQty
  ) {
    return res.status(400).json({
      message:
        "Please fill all the above fields Product Name , Product Description , Product Price , Product StockQty and Product Status",
    });
  }
  await Product.create({
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productStatus: productStatus,
    productStockQty: productStockQty,
    productImage: "http://localhost:3000/" + file.filename,
  });
  res.status(201).json({
    message: "Product Created successfully",
  });
};
