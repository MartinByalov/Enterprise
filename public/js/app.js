// Функция за превключване между формите за вход, регистрация и възстановяване на парола
function toggleForm(form) {
    if (form === 'login') {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('forgot-password-form').style.display = 'none';
    } else if (form === 'register') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
        document.getElementById('forgot-password-form').style.display = 'none';
    } else if (form === 'forgot-password') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('forgot-password-form').style.display = 'block';
    }
}
