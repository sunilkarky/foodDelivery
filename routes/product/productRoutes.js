const {
  createProduct,
  getProducts,
  getSingleProduct,
} = require("../../controller/admin/product/productController");
const checkRoles = require("../../middleware/checkRoles");
const isAuthenticated = require("../../middleware/isAuthenticated");

const router = require("express").Router();
//multer middleware exports
const { multer, storage } = require("../../middleware/multerConfig");
const catchAsync = require("../../services/catchAsync");
const upload = multer({ storage: storage });
router
  .route("/Products")
  .post(
    isAuthenticated,
    checkRoles("admin"),
    upload.single("productImage"),
    catchAsync(createProduct)
  )
  .get(catchAsync(getProducts)); //rest full convention t use same api for post and get
// router.route("/getProducts").get(getProducts);

//single Product

router.route("/products/:id").get(catchAsync(getSingleProduct));

module.exports = router;
