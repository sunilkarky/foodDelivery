const {
  createProduct,
} = require("../../controller/admin/product/productController");
const checkRoles = require("../../middleware/checkRoles");
const isAuthenticated = require("../../middleware/isAuthenticated");

const router = require("express").Router();

router
  .route("/createProduct")
  .post(isAuthenticated, checkRoles("admin"), createProduct);

module.exports = router;
