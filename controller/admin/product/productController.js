const Product = require("../../../model/productModel");

// filesystem package for update images
const fs = require("fs");
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
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  if (products.length == 0) {
    return res.status(400).json({
      message: "No any Products Found",
      products: [], //to catch error in frontend easy
    });
  }
  res.status(200).json({
    message: "Products fetched success",
    products: products,
  });
  // console.log(products);
};

exports.getSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id in URL Parameter",
    });
  }
  const singleProduct = await Product.find({ _id: id });
  if (singleProduct.length == 0) {
    return res.status(400).json({
      message: "No Product with that id found",
      product: [],
    });
  }
  res.status(200).json({
    message: "Product found",
    product: singleProduct,
  });
};
// Delete Products
exports.deleteProducts = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Please provide id",
    });
  }
  const oldFile = await Product.findById(id);
  if (!oldFile) {
    return res.status(404).json({
      message: "No data found of that id",
    });
  }
  const oldFilePath = oldFile.productImage;
  // slice part "http://localhost:3000/" to get exact filename in uploads folder
  const lengthToCut = process.env.BACKEND_URL.length;
  const actualFileName = oldFilePath.slice(lengthToCut);

  fs.unlink("./uploads/" + actualFileName, (err) => {
    if (err) {
      console.log(" error deleting file", err);
    } else {
      console.log("File deleted successfully");
    }
  });

  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: "Product deleted successfully",
  });
};
// update products
exports.updateProducts = async (req, res) => {
  const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStatus,
    productStockQty,
  } = req.body;
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
  const oldFile = await Product.findById(id);
  if (!oldFile) {
    return res.status(404).json({
      message: "No data found of that id",
    });
  }
  const oldFilePath = oldFile.productImage;
  // slice part "http://localhost:3000/" to get exact filename in uploads folder
  const lengthToCut = process.env.BACKEND_URL.length;
  const actualFileName = oldFilePath.slice(lengthToCut);
  //if new image file upload hu da previous file hataune logic
  if (req.file && req.file.filename) {
    fs.unlink("./uploads/" + actualFileName, (err) => {
      if (err) {
        console.log(" error deleting file", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  }
  const updatedData = await Product.findByIdAndUpdate(
    id,
    {
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      productStatus: productStatus,
      productStockQty: productStockQty,
      productImage:
        req.file && req.file.filename
          ? process.env.BACKEND_URL + req.file.filename
          : oldFilePath,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    message: "Product updated successfully",
    data: updatedData,
  });
};
