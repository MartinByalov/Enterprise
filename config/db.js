// config/db.js
const mysql = require("mysql2");
require("dotenv").config(); // Зареждаме .env файла

// Създаваме връзка с базата данни с параметри от .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Проверяваме дали връзката е успешна
db.connect((err) => {
  if (err) {
    console.error("Грешка при свързване с MySQL:", err);
  } else {
    console.log("Свързано с MySQL!");
  }
});

module.exports = db;
