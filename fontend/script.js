document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        alert('Login bem-sucedido!');
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'profile.html';
    } else {
        alert('E-mail ou senha inválidos.');
    }
});
