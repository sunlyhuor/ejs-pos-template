const { Pool } = require('pg');

const myDataSource = new Pool({
  user: 'admin',
  password: 'admin123',
  host: 'localhost',
  port: 5432, // default Postgres port
  database: 'myDb'
});

module.exports = {myDataSource}