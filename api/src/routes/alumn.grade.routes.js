const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/alumn.grade.controller");

router.get("/api/alumns_grade/listall", verifyToken, controller.ListAll);
router.get("/api/alumns_grade/listone/:id", verifyToken, controller.ListOne);
router.post("/api/alumns_grade/save", verifyToken, controller.Save);
router.delete("/api/alumns_grade/delete/:id", verifyToken, controller.Delete);
router.put("/api/alumns_grade/update/:id", verifyToken, controller.Update);

module.exports = router;
