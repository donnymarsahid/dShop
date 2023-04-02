const express = require("express");
const router = express.Router();
const controller = require("./controller");
const multer = require("multer");
const upload = multer({ dest: "upload/" });

// Get List Data
router.get("/list", [], controller.listData);

// Create Data
router.post("/create", upload.single("file"), controller.createData);

// Update Data
router.patch("/update/:id", [], controller.updateData);

// Delete Data
router.delete("/delete/:id", [], controller.deleteData);

module.exports = router;
