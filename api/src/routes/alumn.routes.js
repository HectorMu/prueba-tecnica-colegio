const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/alumn.controller");

router.get("/api/alumns/listall", verifyToken, controller.ListAll);
router.get("/api/alumns/listone/:id", verifyToken, controller.ListOne);
router.post("/api/alumns/save", verifyToken, controller.Save);
router.delete("/api/alumns/delete/:id", verifyToken, controller.Delete);
router.put("/api/alumns/update/:id", verifyToken, controller.Update);

module.exports = router;
