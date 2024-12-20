const express = require("express");
const {
  getLeaves,
  getLeave,
  deleteLeave,
  updateLeave,
  createLeave,
} = require("../controllers/leaves.controller");
const router = express.Router();

router.get("/getall", getLeaves);
router.get("/getone/:id", getLeave);
router.delete("/deleteone/:id", deleteLeave);
router.patch("/update/:id", updateLeave);
router.post("/create", createLeave);

module.exports = router;
