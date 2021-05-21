//logique ROUTING

const express = require("express");
const router = express.Router();

//controllers
const saucesController = require("../controllers/sauces");

//middleware 
const multer = require('../middleware/multer-config');
const verifyToken = require("../middleware/verifyToken");

//GET
router.get("/", verifyToken, saucesController.getSauces);
router.get("/:id", verifyToken, saucesController.getSaucesById);

//POST
router.post("/", verifyToken, multer, saucesController.createSauce);
router.post("/:id/like", verifyToken, saucesController.sauceState);

//PUT
router.put("/:id", verifyToken,multer, saucesController.modifySauce);

//DELETE
router.delete("/:id", verifyToken, saucesController.deleteSauce);


module.exports = router;
