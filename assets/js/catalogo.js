// Função para atualizar a quantidade de itens no carrinho na navbar
function updateCartQuantity() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-quantity').textContent = totalQuantity;
}

// Chama a função para atualizar a quantidade quando a página carregar
window.onload = updateCartQuantity;

// Função para adicionar um livro ao carrinho
function addToCart(book) {
    // Recupera o carrinho atual do localStorage ou cria um novo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verifica se o livro já está no carrinho
    let existingItem = cart.find(item => item.id === book.id);
    
    if (existingItem) {
        // Atualiza a quantidade se o livro já estiver no carrinho
        existingItem.quantity += 1;
    } else {
        // Adiciona o livro ao carrinho
        cart.push({ ...book, quantity: 1 });
    }
    
    // Salva o carrinho atualizado no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Livro adicionado ao carrinho!');


    // Atualiza a quantidade de itens no carrinho na navbar
    updateCartQuantity();
}

// Atualiza a função createProductCards para incluir o novo comportamento do botão
function createProductCards(products) {
    var container = document.getElementById('productCardsContainer');
    container.innerHTML = ''; // Limpa o conteúdo existente

    // Agrupa os livros em conjuntos de três
    var groupedBooks = chunkArray(products, 3);

    groupedBooks.forEach(function (group) {
        group.forEach(function (product) {
            var card = document.createElement("div");
            card.className = "card book-card";
            card.addEventListener("mouseover", function() {
                card.classList.add("hovered");
            });
            card.addEventListener("mouseout", function() {
                card.classList.remove("hovered");
            });

            var promotionBar = document.createElement("div");
            promotionBar.className = "promotion-bar";
            promotionBar.textContent = product.price < 50 ? "30% OFF" : "50% OFF";
            card.appendChild(promotionBar);

            var img = document.createElement('img');
            img.src = product.coverImage;
            img.className = 'card-img-top';
            img.alt = product.title;

            img.addEventListener("click", function() {
                window.location.href = 'produto.html?id=' + product.id;
            });

            var cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            var title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = product.title;

            var price = document.createElement('p');
            price.className = 'card-text';
            price.textContent = 'R$ ' + product.price.toFixed(2).replace('.', ',');

            var buyLink = document.createElement('a');
            buyLink.href = '#'; // Ajustar o link de adição ao carrinho conforme necessário
            buyLink.className = 'btn btn-primary btn-cards';
            buyLink.textContent = 'Adicionar ao carrinho';
            buyLink.addEventListener("click", function(event) {
                event.preventDefault();
                addToCart(product); // Adiciona o livro ao carrinho
            });

            var viewMoreLink = document.createElement('a');
            viewMoreLink.href = 'produto.html?id=' + product.id; // Adiciona o ID do livro na URL
            viewMoreLink.className = 'btn btn-secondary btn-view-more';
            viewMoreLink.textContent = 'Ver Mais';

            cardBody.appendChild(title);
            cardBody.appendChild(price);
            cardBody.appendChild(viewMoreLink);
            cardBody.appendChild(buyLink);

            card.appendChild(img);
            card.appendChild(cardBody);

            container.appendChild(card);
        });
    });
}

// Função para agrupar os livros em conjuntos de três
function chunkArray(array, chunkSize) {
    var results = [];
    while (array.length) {
        results.push(array.splice(0, chunkSize));
    }
    return results;
}

// Fazer a requisição à API do json-server
fetch('http://localhost:3001/book')
    .then(response => response.json())
    .then(data => {
        createProductCards(data);
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));