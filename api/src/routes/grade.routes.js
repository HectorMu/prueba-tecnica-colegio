const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const hasEmpty = require("../middlewares/hasEmpty");

const controller = require("../controllers/grade.controller");

router.get("/api/grade/listall", verifyToken, controller.ListAll);
router.get("/api/grade/listone/:id", verifyToken, controller.ListOne);
router.post("/api/grade/save", verifyToken, hasEmpty, controller.Save);
router.delete("/api/grade/delete/:id", verifyToken, controller.Delete);
router.put("/api/grade/update/:id", verifyToken, hasEmpty, controller.Update);

module.exports = router;
