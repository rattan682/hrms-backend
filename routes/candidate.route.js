const express = require("express");
const {
  getCandidates,
  getCandidate,
  deleteCandidate,
  updateCandidate,
  createCandidate,
  searchCandidate,
  filterCandidate,
} = require("../controllers/candidates.controller");
const router = express.Router();

router.get("/getall", getCandidates);
router.get("/getone/:id", getCandidate);
router.delete("/deleteone/:id", deleteCandidate);
router.patch("/update/:id", updateCandidate);
router.post("/create", createCandidate);
router.post("/search", searchCandidate);
router.post("/filter", filterCandidate);

module.exports = router;
