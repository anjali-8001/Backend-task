const express = require("express");
const client = require("./config/connectDb");
const employeeModel = require("./models/employeeModel.js");
const app = express();
require("dotenv").config();
const port = process.env.port || 4000;

app.get("/", (req, res) => {
  res.send("Welcome!");
});

client
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected successfully:", result.rows[0]);
  })
  .catch((err) => {
    console.error("Error connecting to the database", err.stack);
    process.exit(1);
  });

app.use(express.json());

employeeModel.createEmployeeTable();

app.use("/api/employees", require("./routes/employeeRoutes.js"));

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
