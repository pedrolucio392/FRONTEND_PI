// Função para atualizar a quantidade de itens no carrinho na navbar
function updateCartQuantity() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-quantity").textContent = totalQuantity;
}

// Chama a função para atualizar a quantidade quando a página carregar
window.onload = updateCartQuantity;
/* Iniciar o Carrossel */

function addToCart(book) {
  // Recupera o carrinho atual do localStorage ou cria um novo
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica se o livro já está no carrinho
  let existingItem = cart.find((item) => item.id === book.id);

  if (existingItem) {
    // Atualiza a quantidade se o livro já estiver no carrinho
    existingItem.quantity += 1;
  } else {
    // Adiciona o livro ao carrinho
    cart.push({ ...book, quantity: 1 });
  }

  // Salva o carrinho atualizado no localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Livro adicionado ao carrinho!");

  // Atualiza a quantidade de itens no carrinho na navbar
  updateCartQuantity();
}

$(document).ready(function () {
  $(".carousel").carousel({
    interval: 10000,
    pause: false,
  });
});

/* Controlar setas carroseel */

var bannerCarousel = document.getElementById("carouselBanner");

bannerCarousel.addEventListener("mouseenter", function () {
  bannerCarousel.classList.add("show-arrows");
});

bannerCarousel.addEventListener("mouseleave", function () {
  bannerCarousel.classList.remove("show-arrows");
});

function createBookCarouselPromotion(books) {
  // Filtra os livros que estão em promoção
  var livrosOfertas = books.filter((book) => book.isOnSale == true);

  var bookContainer = document.getElementById("bookContainerPromotion");

  // Limpa o conteúdo existente no contêiner
  bookContainer.innerHTML = "";

  // Agrupa os livros em conjuntos de 4
  var groupedBooks = chunkArray(livrosOfertas, 4);

  groupedBooks.forEach(function (group, index) {
    var carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item" + (index === 0 ? " active" : "");

    var cardDeck = document.createElement("div");
    cardDeck.className = "card-deck";

    group.forEach(function (book) {
      var card = document.createElement("div");
      card.className = "card book-card";
      card.addEventListener("mouseover", function () {
        card.classList.add("hovered");
      });
      card.addEventListener("mouseout", function () {
        card.classList.remove("hovered");
      });

      if (book.price < 50) {
        var promotionBar = document.createElement("div");
        promotionBar.className = "promotion-bar";
        promotionBar.textContent = "30% OFF";
        card.appendChild(promotionBar);
      } else {
        var promotionBar = document.createElement("div");
        promotionBar.className = "promotion-bar";
        promotionBar.textContent = "50% OFF";
        card.appendChild(promotionBar);
      }

      var img = document.createElement("img");
      img.src = book.coverImage;
      img.className = "card-img-top";
      img.alt = book.title;

      img.addEventListener("click", function () {
        window.location.href = "produto.html?id=" + book.id;
      });

      var cardBody = document.createElement("div");
      cardBody.className = "card-body";

      var title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = book.title;

      var price = document.createElement("p");
      price.className = "card-text";
      price.textContent = "R$ " + book.price.toFixed(2).replace(".", ",");

      var buyLink = document.createElement("a");
      buyLink.href = book.buyLink;
      buyLink.className = "btn btn-primary btn-cards";
      buyLink.textContent = "Adicionar ao carrinho";
      buyLink.addEventListener("click", function (event) {
        event.preventDefault();
        addToCart(book);
      });

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(buyLink);

      card.appendChild(img);
      card.appendChild(cardBody);

      cardDeck.appendChild(card);
    });

    carouselItem.appendChild(cardDeck);
    bookContainer.appendChild(carouselItem);
  });
}

// Função para criar os cards dos livros no carrossel

function createBookCarouselBestSellers(books) {
  var livrosMaisVendidos = books.filter((book) => book.isBestSeller == true);

  var bookContainer = document.getElementById("bookContainerBestSellers");

  // Agrupa os livros em conjuntos de 5
  var groupedBooks = chunkArray(livrosMaisVendidos, 4);

  groupedBooks.forEach(function (group, index) {
    var carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item" + (index === 0 ? " active" : "");

    var cardDeck = document.createElement("div");
    cardDeck.className = "card-deck";

    group.forEach(function (book) {
      var card = document.createElement("div");
      card.className = "card book-card";
      card.addEventListener("mouseover", function () {
        card.classList.add("hovered");
      });
      card.addEventListener("mouseout", function () {
        card.classList.remove("hovered");
      });

      if (book.price < 50) {
        var promotionBar = document.createElement("div");
        promotionBar.className = "promotion-bar";

        promotionBar.textContent = "30% OFF";

        card.appendChild(promotionBar);
      } else {
        var promotionBar = document.createElement("div");
        promotionBar.className = "promotion-bar";

        promotionBar.textContent = "50% OFF";

        card.appendChild(promotionBar);
      }

      var img = document.createElement("img");
      img.src = book.coverImage;
      img.className = "card-img-top";
      img.alt = book.title;

      img.addEventListener("click", function () {
        window.location.href = "produto.html?id=" + book.id;
      });

      var cardBody = document.createElement("div");
      cardBody.className = "card-body";

      var title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = book.title;

      var price = document.createElement("p");
      price.className = "card-text";
      price.textContent = "R$ " + book.price.toFixed(2).replace(".", ","); // Formatação de preço

      var buyLink = document.createElement("a");
      buyLink.href = book.buyLink;
      buyLink.className = "btn btn-primary btn-cards";
      buyLink.textContent = "Adicionar ao carrinho";

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(buyLink);

      card.appendChild(img);
      card.appendChild(cardBody);

      cardDeck.appendChild(card);
    });

    carouselItem.appendChild(cardDeck);
    bookContainer.appendChild(carouselItem);
  });
}

// Função para dividir um array em grupos de tamanho n
function chunkArray(array, size) {
  var result = [];
  for (var i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

fetch("http://localhost:3001/book")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    createBookCarouselPromotion(data);
    createBookCarouselBestSellers(data);
  })
  .catch((error) => console.error("Erro ao carregar os dados:", error));
