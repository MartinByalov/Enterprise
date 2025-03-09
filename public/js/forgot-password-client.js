document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("forgot-password-email").value;
            const errorMessage = document.getElementById("forgot-password-error-message");

            // Проверка за валиден имейл
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                errorMessage.textContent = "Моля, въведете валиден имейл адрес.";
                return;
            }

            // Изпращане на заявка за възстановяване на парола
            const res = await fetch("http://localhost:3000/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.message) {
                alert(data.message); // Покажи съобщение за изпратен линк за възстановяване
                toggleForm('login'); // Пренасочване към формата за вход
            } else {
                errorMessage.textContent = data.error || "Неуспешно възстановяване на парола. Моля, опитайте отново.";
            }
        });
    }
});
