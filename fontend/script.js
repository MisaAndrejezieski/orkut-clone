document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5500/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'Erro ao fazer login. Verifique suas credenciais.');
            return;
        }

        const data = await response.json();
        alert('Login bem-sucedido!');
        localStorage.setItem('user', JSON.stringify(data)); // Salva informações do usuário
        window.location.href = 'profile.html'; // Redireciona para o perfil
    } catch (error) {
        alert('Erro ao conectar ao servidor. Verifique se o backend está rodando.');
        console.error('Erro:', error);
    }
});
