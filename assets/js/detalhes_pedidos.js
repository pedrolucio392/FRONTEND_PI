const orderDetailsContainer = document.getElementById("order-details");

// Obtém o ID do pedido a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("orderId");

fetch(`http://localhost:3001/order/${orderId}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            const order = data.data;

            // Exibe os detalhes do pedido
            orderDetailsContainer.innerHTML = `
                <h2>Pedido #${order.id}</h2>
                <p>Cliente: ${order.user.name}</p>
                <p>Email: ${order.user.email}</p>
                <p>Data: ${order.createdAt}</p>
                <h3>Itens:</h3>
                <ul>
                    ${order.orderItems
                        .map(
                            (item) =>
                                `<li>${item.book.title} - ${item.quantity} unidade(s)</li>`
                        )
                        .join("")}
                </ul>
            `;
        } else {
            orderDetailsContainer.innerHTML =
                "<p>Não foi possível carregar os detalhes do pedido.</p>";
        }
    })
    .catch((error) => {
        console.error("Erro ao buscar os detalhes do pedido:", error);
        orderDetailsContainer.innerHTML =
            "<p>Erro ao carregar os detalhes do pedido.</p>";
    });
