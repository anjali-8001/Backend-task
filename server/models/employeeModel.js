const { Client } = require("pg");
const client = require("../config/connectDb");

const createEmployeeTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      position VARCHAR(100) NOT NULL,
      salary INTEGER NOT NULL,
      date_of_joining DATE NOT NULL,
      department VARCHAR(100)
    );
  `;

  try {
    await client.query(createTableQuery);
    console.log("Employee table created or already exists.");
  } catch (error) {
    console.error("Error creating employee table:", error);
  }
};

// add a new employee to the 'employees' table
const addEmployee = async (
  name,
  email,
  position,
  salary,
  date_of_joining,
  department
) => {
  const insertQuery = `
    INSERT INTO employees (name, email, position, salary, date_of_joining, department)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    const result = await client.query(insertQuery, [
      name,
      email,
      position,
      salary,
      date_of_joining,
      department,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// get all employees from the 'employees' table
const getAllEmployees = async () => {
  const selectQuery = `SELECT * FROM employees`;

  try {
    const result = await client.query(selectQuery);
    return result.rows;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Function to get an employee by email
const getEmployeeByEmail = async (email) => {
  const query = `SELECT * FROM employees WHERE email = $1`;

  try {
    const result = await client.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.error("Error checking employee email:", error);
    throw error;
  }
};

// Function to update an employee's details
const updateEmployee = async (id, updates) => {
  const { position, salary, department } = updates;
  const fieldsToUpdate = [];
  const values = [];

  let query = `UPDATE employees SET `;

  if (position) {
    fieldsToUpdate.push(`position = $${fieldsToUpdate.length + 1}`);
    values.push(position);
  }

  if (salary) {
    fieldsToUpdate.push(`salary = $${fieldsToUpdate.length + 1}`);
    values.push(salary);
  }

  if (department) {
    fieldsToUpdate.push(`department = $${fieldsToUpdate.length + 1}`);
    values.push(department);
  }

  if (fieldsToUpdate.length === 0) {
    return null;
  }

  query +=
    fieldsToUpdate.join(", ") +
    ` WHERE id = $${fieldsToUpdate.length + 1} RETURNING *;`;
  values.push(id);

  try {
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Function to delete an employee by ID
const deleteEmployee = async (id) => {
  const query = `DELETE FROM employees WHERE id = $1 RETURNING *;`;

  try {
    const result = await client.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

// Function to get employees by department
const getEmployeesByDepartment = async (department) => {
  const query = `SELECT * FROM employees WHERE department = $1;`;

  try {
    const result = await client.query(query, [department]);
    return result.rows; // Return employees in the given department
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    throw error;
  }
};

module.exports = {
  createEmployeeTable,
  addEmployee,
  getAllEmployees,
  getEmployeeByEmail,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
};
