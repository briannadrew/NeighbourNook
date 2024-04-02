const express = require("express");
const { param } = require("express-validator");
const StoreController = require("../controllers/StoreController");
const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string."),
  StoreController.searchStore
);

module.exports = router;
