const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const registerMessage = document.getElementById("register-message");
        const errorMessage = document.getElementById("register-error-message");

        // Проверка за валиден имейл
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = "Моля, въведете валиден имейл адрес.";
            return;
        }

        // Проверка за парола
        if (password.length < 6) {
            errorMessage.textContent = "Паролата трябва да съдържа поне 6 знака.";
            return;
        }

        // Изпращане на заявка за регистрация
        const res = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        try {
            const data = await res.json();

            // Проверка дали отговорът е успешен
            if (res.status === 200 && data.message) {
                // Скриваме следните елементи:
                document.querySelector("h1").style.display = "none";  // Заглавието "Регистрация"
                document.getElementById("register-email").style.display = "none";  // Полето за имейл
                document.getElementById("register-password").style.display = "none";  // Полето за парола
                document.querySelector("button[type='submit']").style.display = "none";  // Бутон за регистрация
                document.querySelector("a").style.display = "none";  // Линк "Вече имате профил?"

                // Показваме съобщението за успешна регистрация в контейнера
                registerMessage.innerHTML = `
                    <div class='success-message'>
                        <h2>Успешна регистрация</h2>
                    </div>
                    <div class="loading">
                        <p>Пренасочване след <span id="countdown">5</span> секунди...</p>
                    </div>
                `;

                // Добавяме малко стилове, за да се уверим, че съобщението е видимо
                registerMessage.style.display = "block";
                errorMessage.textContent = ""; // Изчистваме евентуални грешки

                // Започваме отброяване на 5 секунди за пренасочване
                let countdown = 5;
                const countdownElement = document.getElementById("countdown");

                const interval = setInterval(() => {
                    countdown -= 1;
                    countdownElement.textContent = countdown;

                    // Когато отброяването свърши, пренасочваме към началната страница
                    if (countdown <= 0) {
                        clearInterval(interval);
                        window.location.href = "http://localhost:3000/index.html"; // Пренасочване към вход
                    }
                }, 1000);
            } else {
                // Ако има грешка в данните
                errorMessage.textContent = data.error || "Неуспешна регистрация. Моля, опитайте отново.";
            }
        } catch (error) {
            // В случай на грешка при парсирането на отговора
            console.error("Грешка при парсирането на отговора:", error);
            errorMessage.textContent = "Неуспешна регистрация. Моля, опитайте отново.";
        }
    });
}
