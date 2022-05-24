const express = require("express");
const router = express.Router();
const hasEmpty = require("../middlewares/hasEmpty");

const controller = require("../controllers/auth.controller");

router.post("/api/login", hasEmpty, controller.Login);

module.exports = router;
