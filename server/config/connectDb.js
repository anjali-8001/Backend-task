const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false, 
  },
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database on Render"))
  .catch((err) => {
    console.error("Error connecting to the database", err.stack);
    process.exit(1);
  });

module.exports = client;
