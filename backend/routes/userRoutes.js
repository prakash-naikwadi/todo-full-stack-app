const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth.js");

const { getUser, signup, login } = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);
router.use(checkAuth);
router.get("/getUser", getUser);

module.exports = router;
