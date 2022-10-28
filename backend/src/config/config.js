const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { DB_USER, DB_PASS, DB_NAME, dialect } = process.env;
const config = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: "127.0.0.1",
    dialect: dialect,
  },
};
module.exports = config;
