const express = require("express");
const {
  getEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  createEmployee,
  searchEmployee,
  filterEmployee,
} = require("../controllers/employees.controller");
const router = express.Router();
router.get("/getall", getEmployees);
router.get("/getone/:id", getEmployee);
router.delete("/deleteone/:id", deleteEmployee);
router.patch("/update/:id", updateEmployee);
router.post("/create", createEmployee);
router.post("/search", searchEmployee);
router.post("/filter", filterEmployee);
module.exports = router;
