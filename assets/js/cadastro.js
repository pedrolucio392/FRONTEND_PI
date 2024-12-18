document
    .getElementById("signupForm")
    .addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o reload da página

        // Obtendo os valores dos campos
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message = document.getElementById("message");
        const passwordError = document.getElementById("passwordError");
        const confirmPasswordError = document.getElementById(
            "confirmPasswordError"
        );

        // Validações de senha
        if (!validatePassword(password)) {
            passwordError.textContent = "A senha não atende os requisitos.";
            return;
        } else {
            passwordError.textContent = "";
        }

        if (password !== confirmPassword) {
            confirmPasswordError.textContent = "As senhas não coincidem!";
            return;
        } else {
            confirmPasswordError.textContent = "";
        }

        // Requisição para a API de cadastro
        try {
            const response = await fetch("http://localhost:3001/user", {
                // Ajuste a URL conforme sua API
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: username, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Cadastro bem-sucedido
                message.style.color = "green";
                message.textContent =
                    "Cadastro realizado com sucesso! Redirecionando...";

                // Redirecionar para a página de login após 2 segundos
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                // Exibir mensagem de erro
                message.style.color = "red";
                message.textContent =
                    data.message || "Erro ao realizar o cadastro.";
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            message.style.color = "red";
            message.textContent = "Erro ao conectar ao servidor.";
        }
    });

// Exibir dica de senha
document.getElementById("password").addEventListener("focus", () => {
    document.getElementById("passwordHint").style.display = "block";
});

document.getElementById("password").addEventListener("blur", () => {
    document.getElementById("passwordHint").style.display = "none";
});

// Mostrar força da senha
document.getElementById("password").addEventListener("input", () => {
    const password = document.getElementById("password").value;
    const passwordStrength = document.getElementById("passwordStrength");
    const strength = getPasswordStrength(password);

    passwordStrength.innerHTML = ""; // Limpar barras anteriores
    if (strength) {
        const strengthBar = document.createElement("div");
        strengthBar.className = strength;
        passwordStrength.appendChild(strengthBar);
    }
});

// Função para validar a senha
function validatePassword(password) {
    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

// Função para determinar a força da senha
function getPasswordStrength(password) {
    if (password.length < 8) {
        return "weak";
    }
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
        return "strong";
    }
    return "medium";
}
