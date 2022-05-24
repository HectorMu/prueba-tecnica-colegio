const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

const controller = require("../controllers/professor.controller");

router.get("/api/professors/listall", verifyToken, controller.ListAll);
router.get("/api/professors/listone/:id", verifyToken, controller.ListOne);
router.post("/api/professors/save", verifyToken, controller.Save);
router.delete("/api/professors/delete/:id", verifyToken, controller.Delete);
router.put("/api/professors/update/:id", verifyToken, controller.Update);

module.exports = router;
