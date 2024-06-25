const { Pool } = require('pg');
require("dotenv").config()

const myDataSource = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432, // default Postgres port
  database: process.env.DB_NAME
});

module.exports = {myDataSource}