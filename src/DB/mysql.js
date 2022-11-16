const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require('mysql2/promise')

const dbConfig = {
  host: process.env.mysql_dev_ip,
  port: process.env.mysql_dev_port,
  user: process.env.mysql_dev_user,
  password: process.env.mysql_dev_pw,
  database: process.env.DATABASE,
  multipleStatements: true,
  connectionLimit: 10,
};

const mysql = mysql2.createPool(dbConfig);


module.exports = mysql;


