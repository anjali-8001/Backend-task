const express = require("express");
const {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/EmployeeControllers");
const router = express.Router();

// POST: Add an Employee
router.post("/", addEmployee);

// GET: Get All Employees or Search by Department
router.get("/", getAllEmployees);

// PUT: Update Employee Details
router.put("/:id", updateEmployee);

// DELETE: Delete an Employee
router.delete("/:id", deleteEmployee);

module.exports = router;
