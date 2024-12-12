// Função para criar o HTML do carrinho
function createCartHTML() {
    const cartItemsContainer = document.getElementById('cart-items');
    const resumoCompra = document.getElementById('resumoCompra');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo existente
    
    let subtotal = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item mb-4';

        const card = document.createElement('div');
        card.className = 'card';
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        
        const row = document.createElement('div');
        row.className = 'row';
        
        const colImg = document.createElement('div');
        colImg.className = 'col-md-4';
        
        const img = document.createElement('img');
        img.src = item.coverImage;
        img.className = 'card-img';
        img.alt = 'Imagem do Livro';
        
        colImg.appendChild(img);
        
        const colDetails = document.createElement('div');
        colDetails.className = 'col-md-8';
        
        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = item.title;
        
        const quantity = document.createElement('p');
        quantity.className = 'card-text quantidade';
        quantity.textContent = 'Quantidade: ' + item.quantity;
        
        const price = document.createElement('p');
        price.className = 'card-text price';
        price.textContent = 'R$ ' + (item.price * item.quantity).toFixed(2).replace('.', ',');
        
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
    resumoCompra.querySelector('.subtotal').textContent = 'R$ ' + subtotal.toFixed(2).replace('.', ',');
    resumoCompra.querySelector('.card-text.font-weight-bold').textContent = 'Total a Pagar: R$ ' + subtotal.toFixed(2).replace('.', ',');
}

// Chama a função para criar o HTML do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', createCartHTML);


function updateCartQuantity() {
    // Recupera o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Calcula a quantidade total de itens no carrinho
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    // Atualiza o elemento da quantidade na navbar
    document.querySelector('.cart-quantity').textContent = totalQuantity;
}


function updateCartItemQuantity(bookId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Encontra o item no carrinho
    let itemIndex = cart.findIndex(item => item.id === bookId);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;

        // Se a quantidade for menor que 1, remova o item
        if (cart[itemIndex].quantity < 1) {
            cart.splice(itemIndex, 1);
        }
    }

    // Atualiza o localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza a interface do carrinho
    renderCartItems();
    updateCartQuantity();
    // Recarrega a página para atualizar a interface
    location.reload();
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Limpa os itens existentes

    cart.forEach(book => {
        let cartItem = document.createElement('li');
        cartItem.className = 'list-group-item mb-4';

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
                            <p class="card-text price">R$ ${book.price.toFixed(2).replace('.', ',')}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
}

// Chama a função para renderizar os itens do carrinho quando a página carregar
window.onload = function() {
    renderCartItems();
    updateCartQuantity();
};