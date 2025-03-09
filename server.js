const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const registerRoutes = require('./routes/register-server');
const loginRoutes = require('./routes/login-server');
const path = require("path");

// Зареждаме .env файл за конфигурации
dotenv.config(); 

const app = express();  // Преместих тук инициализацията на `app`

app.use(express.json()); // За да обработваме JSON заявки

// Позволява CORS
app.use(cors());

// Добави статичен маршрут за публични файлове
app.use(express.static(path.join(__dirname, 'public'))); // Път към папката с публичните файлове

// Използване на маршрутите
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

// Стартиране на сървъра
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сървърът работи на http://localhost:${PORT}`);
});
