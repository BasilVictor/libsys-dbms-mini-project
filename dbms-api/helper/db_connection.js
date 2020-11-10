const { Pool } = require('pg')
const pool = new Pool({
  user: "postgres",
  password: "password",
  host: "127.0.0.1",
  port: 5432,
  database: "dbms_library_mini_project"
});
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}