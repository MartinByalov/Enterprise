const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const router = express.Router();

// Регистрация на потребител
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Моля, попълнете всички полета!" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Грешка на сървъра!" });
    if (result.length > 0) {
      return res.status(400).json({ error: "Потребител с този имейл вече съществува!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
      if (err) return res.status(500).json({ error: "Грешка при регистрация!" });

      res.json({ message: "Успешна регистрация! Сега можете да влезете в системата." });
    });
  });
});

module.exports = router;
