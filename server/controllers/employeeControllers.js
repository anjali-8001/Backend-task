const employeeModel = require("../models/employeeModel");

// Controller function to create an employee
const addEmployee = async (req, res) => {
  const { name, email, position, salary, date_of_joining, department } =
    req.body;

  if (!name || !email || !position || !salary || !date_of_joining) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
  }

  try {
    // Check if the employee email already exists
    const existingEmployee = await employeeModel.getEmployeeByEmail(email);
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee with this email already exists.",
      });
    }

    const newEmployee = await employeeModel.addEmployee(
      name,
      email,
      position,
      salary,
      date_of_joining,
      department
    );
    res.status(201).json({
      success: true,
      data: newEmployee,
      message: "Employee added successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee.", success: false });
  }
};

// Controller function to get all employees and all empyees by department
const getAllEmployees = async (req, res) => {
  const { department } = req.query;

  try {
    if (department) {
      // If department is provided, get employees by department
      const employees = await employeeModel.getEmployeesByDepartment(
        department
      );

      if (employees.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Employees fetched successfully.",
          data: employees,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No employees found in this department.",
        });
      }
    } else {
      // If no department, get all employees
      const employees = await employeeModel.getAllEmployees();

      if (employees.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Employees fetched successfully.",
          data: employees,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "No employees found." });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching employees." });
  }
};

// Controller function to update employee details
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { position, salary, department } = req.body;

  if (!position && !salary && !department) {
    return res
      .status(400)
      .json({ success: false, message: "No fields to update." });
  }

  try {
    const updatedEmployee = await employeeModel.updateEmployee(id, {
      position,
      salary,
      department,
    });

    if (updatedEmployee) {
      return res.status(200).json({
        success: true,
        message: "Employee Updated successfully.",
        data: updatedEmployee,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating employee." });
  }
};

// Controller function to delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await employeeModel.deleteEmployee(id);

    if (deletedEmployee) {
      return res
        .status(200)
        .json({ success: true, message: "Employee deleted successfully." });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting employee." });
  }
};

module.exports = {
  addEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
