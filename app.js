require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Връзка с MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "enterprise_db",
});

db.connect(err => {
  if (err) {
    console.error("❌ Грешка при свързване с MySQL:", err);
  } else {
    console.log("✅ Свързано с MySQL!");
  }
});

// Регистрация (по желание, за тестове)
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ Потребител създаден!" });
  });
});

// Вход (Login)
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(401).json({ error: "❌ Грешен email!" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "❌ Грешна парола!" });

    // Генериране на токен
    const token = jwt.sign({ id: user.id }, "supersecret", { expiresIn: "1h" });
    res.json({ message: "✅ Успешен вход!", token });
  });
});

// Защита на API заявки
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "❌ Достъпът е отказан!" });

  jwt.verify(token, "supersecret", (err, decoded) => {
    if (err) return res.status(403).json({ error: "❌ Невалиден токен!" });
    req.user = decoded;
    next();
  });
};

// Тестово API за панела
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "✅ Добре дошли в администраторския панел!" });
});

// Стартиране на сървъра
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Сървърът работи на http://localhost:${PORT}`);
});
