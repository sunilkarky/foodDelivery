const {
  createProduct,
} = require("../../controller/admin/product/productController");
const checkRoles = require("../../middleware/checkRoles");
const isAuthenticated = require("../../middleware/isAuthenticated");

const router = require("express").Router();
//multer middleware exports
const {multer,storage} = require("../../middleware/multerConfig")
const upload = multer ({storage : storage})
router
  .route("/createProduct")
  .post(isAuthenticated, checkRoles("admin"),upload.single('productImage'),createProduct);

module.exports = router;
