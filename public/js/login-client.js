document.addEventListener('DOMContentLoaded', function() {
    // Логика за вход
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const errorMessage = document.getElementById("login-error-message");

            // Проверка за валиден имейл
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                errorMessage.textContent = "Моля, въведете валиден имейл адрес.";
                return;
            }

            // Проверка за парола
            if (password.length < 6) {
                errorMessage.textContent = "Паролата трябва да съдържа поне 6 знака.";
                return;
            }

            // Изпращане на заявка за вход
            const res = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html"; // Пренасочване
            } else {
                errorMessage.textContent = data.error || "Неуспешен вход. Моля, проверете вашите данни.";
            }
        });
    }
});
