//logique routing

const express = require("express");
const router = express.Router();

const saucesController = require("../controllers/sauces");

const verifyToken = require("../middleware/verifyToken");

//GET
router.get("/", verifyToken, saucesController.getSauces);
router.get("/:id", verifyToken, saucesController.getSaucesById);

//POST
router.post("/", verifyToken, saucesController.createSauce);
router.post("/:id/like", verifyToken, saucesController.sauceState);

//PUT
router.put("/:id", verifyToken, saucesController.modifySauce);

//DELETE
router.delete("/:id", verifyToken, saucesController.deleteSauce);

module.exports = router;
