const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB_PASS", process.env.DB_PASS);
console.log("DB_NAME", process.env.DB_NAME);
console.log("DB_USERNAME", process.env.DB_USERNAME);

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    logging: false,
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
