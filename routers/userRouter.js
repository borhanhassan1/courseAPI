const express = require("express");
const router = express.Router();
const userContoller = require("../Controllers/userController");

router.get("/", userContoller.getUsers);
router.post("/register", userContoller.register);
router.post("/login", userContoller.login);
module.exports = router;
