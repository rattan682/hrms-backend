const express = require("express");
const {
  getCandidates,
  getCandidate,
  deleteCandidate,
  updateCandidate,
  createCandidate
} = require("../controllers/candidates.controller");
const router = express.Router();

router.get("/getall", getCandidates);
router.get("/getone/:id", getCandidate);
router.delete("/deleteone/:id", deleteCandidate);
router.patch("/update/:id", updateCandidate);
router.post("/create", createCandidate)

module.exports = router;
