// Função para criar o HTML do carrinho
function createCartHTML() {
    const cartItemsContainer = document.getElementById("cart-items");
    const resumoCompra = document.getElementById("resumoCompra");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = ""; // Limpa o conteúdo existente

    let subtotal = 0;

    cart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item mb-4";

        const card = document.createElement("div");
        card.className = "card";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const row = document.createElement("div");
        row.className = "row";

        const colImg = document.createElement("div");
        colImg.className = "col-md-4";

        const img = document.createElement("img");
        img.src = item.coverImage;
        img.className = "card-img";
        img.alt = "Imagem do Livro";

        colImg.appendChild(img);

        const colDetails = document.createElement("div");
        colDetails.className = "col-md-8";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = item.title;

        const quantity = document.createElement("p");
        quantity.className = "card-text quantidade";
        quantity.textContent = "Quantidade: " + item.quantity;

        const price = document.createElement("p");
        price.className = "card-text price";
        price.textContent =
            "R$ " + (item.price * item.quantity).toFixed(2).replace(".", ",");

        colDetails.appendChild(title);
        colDetails.appendChild(quantity);
        colDetails.appendChild(price);

        row.appendChild(colImg);
        row.appendChild(colDetails);

        cardBody.appendChild(row);
        card.appendChild(cardBody);

        listItem.appendChild(card);

        cartItemsContainer.appendChild(listItem);

        subtotal += item.price * item.quantity;
    });

    // Atualiza o resumo da compra
    resumoCompra.querySelector(".subtotal").textContent =
        "R$ " + subtotal.toFixed(2).replace(".", ",");
    resumoCompra.querySelector(".card-text.font-weight-bold").textContent =
        "Total a Pagar: R$ " + subtotal.toFixed(2).replace(".", ",");
}

// Chama a função para criar o HTML do carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", createCartHTML);

function updateCartQuantity() {
    // Recupera o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calcula a quantidade total de itens no carrinho
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Atualiza o elemento da quantidade na navbar
    document.querySelector(".cart-quantity").textContent = totalQuantity;
}

function updateCartItemQuantity(bookId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Encontra o item no carrinho
    let itemIndex = cart.findIndex((item) => item.id === bookId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        // Se a quantidade for menor que 1, remova o item
        if (cart[itemIndex].quantity < 1) {
            cart.splice(itemIndex, 1);
        }
    }

    // Atualiza o localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Atualiza a interface do carrinho
    renderCartItems();
    updateCartQuantity();
    // Recarrega a página para atualizar a interface
    location.reload();
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Limpa os itens existentes

    cart.forEach((book) => {
        let cartItem = document.createElement("li");
        cartItem.className = "list-group-item mb-4";

        cartItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.coverImage}" class="card-img" alt="Imagem do Livro">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${book.title}</h5>
                            <div class="quantity-controls">
                                <button class="btn btn-outline-secondary btn-sm decrement-btn" onclick="updateCartItemQuantity(${book.id}, -1)">-</button>
                                <span class="card-text quantidade">${book.quantity}</span>
                                <button class="btn btn-outline-secondary btn-sm increment-btn" onclick="updateCartItemQuantity(${book.id}, 1)">+</button>
                            </div>
                            <p class="card-text price">R$ ${book.price.toFixed(2).replace(".", ",")}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
}

function finalizarCompra() {
    const finalizarButton = document.querySelector(".btn-primary");
    finalizarButton.disabled = true;
    finalizarButton.textContent = "Processando...";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        finalizarButton.disabled = false;
        finalizarButton.textContent = "Finalizar Compra";
        return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Você precisa estar logado para finalizar a compra!");
        finalizarButton.disabled = false;
        finalizarButton.textContent = "Finalizar Compra";
        return;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodificando a parte do payload do JWT
        console.log(decodedToken);
        userId = decodedToken.userId; // Acessa o 'userId'
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        alert("Erro ao decodificar o token. Faça login novamente.");
        finalizarButton.disabled = false;
        finalizarButton.textContent = "Finalizar Compra";
        return;
    }

    if (!userId) {
        alert("Não foi possível encontrar o ID do usuário.");
        finalizarButton.disabled = false;
        finalizarButton.textContent = "Finalizar Compra";
        return;
    }

    const orderData = {
        userId: userId, // Substitua pelo ID do usuário
        items: cart.map((item) => ({
            bookId: item.id,
            quantity: item.quantity,
        })),
    };

    fetch("http://localhost:3001/order", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
    })
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((result) => {
            if (result.success) {
                alert("Compra finalizada com sucesso!");
                localStorage.removeItem("cart");
                renderCartItems();
                updateCartQuantity();
            } else {
                alert(result.message || "Erro ao finalizar a compra.");
            }
        })
        .catch((error) => {
            console.error("Erro ao conectar com a API", error);
            alert("Erro ao conectar com o servidor.");
        })
        .finally(() => {
            finalizarButton.disabled = false;
            finalizarButton.textContent = "Finalizar Compra";
        });
}

// Chama a função para renderizar os itens do carrinho quando a página carregar
window.onload = function () {
    renderCartItems();
    updateCartQuantity();
};
