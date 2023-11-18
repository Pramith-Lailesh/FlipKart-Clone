const express = require("express");
const { userSignUp, userLogin } = require("../controller/userController");
const {
  getProducts,
  getProductById,
} = require("../controller/productController");

const {
  checkOut,
  getKey,
  paymentVerification,
} = require("../controller/paymentController");

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post("/checkout", checkOut);
router.get("/getKey", getKey);
router.post("/paymentVerification", paymentVerification);
module.exports = router;
