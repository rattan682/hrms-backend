const express = require("express");
const { getAttendence, getAttendee, deleteAttendence, updateAttendence } = require("../controllers/attendance.controller");
const router = express.Router();

router.get("/getall", getAttendence);
router.get("/getone/:id", getAttendee);
router.delete("/deleteone/:id", deleteAttendence);
router.patch("/update/:id", updateAttendence);

module.exports = router;
