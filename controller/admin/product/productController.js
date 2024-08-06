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
