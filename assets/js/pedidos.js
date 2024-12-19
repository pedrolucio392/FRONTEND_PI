const ordersContainer = document.getElementById("orders-container");

fetch("http://localhost:3001/order/admin", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            const orders = data.data;

            orders.forEach((order) => {
                // Cria o link do cartão
                const cardLink = document.createElement("a");
                cardLink.href = `detalhes_pedidos.html?orderId=${order.id}`;
                cardLink.classList.add("order-card");

                // Adiciona conteúdo ao cartão
                cardLink.innerHTML = `
                    <h3>Pedido #${order.id}</h3>
                    <p>Cliente: ${order.user.name}</p>
                    <p>Data: ${order.createdAt}</p>
                `;

                ordersContainer.appendChild(cardLink);
            });
        } else {
            ordersContainer.innerHTML = "<p>Não há pedidos disponíveis.</p>";
        }
    })
    .catch((error) => {
        console.error("Erro ao buscar os pedidos:", error);
        ordersContainer.innerHTML = "<p>Erro ao carregar os pedidos.</p>";
    });

document
    .getElementById("logout-link")
    .addEventListener("click", function (event) {
        event.preventDefault(); // Evita o comportamento padrão de redirecionamento

        // Remove o token do localStorage
        localStorage.removeItem("token");

        // Redireciona para a página de login
        window.location.href = "login.html";
    });

const verifyToken = () => {
    const token = localStorage.getItem("token");

    // Se não houver token
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Função para decodificar a parte do payload do token
    const decodeJwt = (token) => {
        const base64Url = token.split(".")[1]; // Pegamos a segunda parte (payload)
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Ajusta os caracteres do base64
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload); // Retorna o objeto decodificado
    };

    try {
        const decoded = decodeJwt(token);

        // Verifica a data de expiração do token
        if (decoded.exp * 1000 < Date.now()) {
            // Se o token expirou
            localStorage.removeItem("token");
            window.location.href = "login.html";
        }
    } catch (error) {
        // Caso haja algum erro no processamento do token
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
};

document.addEventListener("DOMContentLoaded", verifyToken);
