const express = require("express");
const MyUserController = require("../controllers/MyUserController");
const { jwtCheck, jwtParse } = require("../middleware/auth");
const { validateMyUserRequest } = require("../middleware/validation");
const router = express.Router();

router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/", jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

module.exports = router;