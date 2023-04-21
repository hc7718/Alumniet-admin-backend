const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
router.post("/admin/addAdmin", adminController.addAdmin);
router.get("/admin/isAdmin", adminController.checkAdmin);
router.post("/admin/sendOTP", adminController.sendEmail);
router.post("/admin/verifyOTP", adminController.verifyOTP);
module.exports = router;
