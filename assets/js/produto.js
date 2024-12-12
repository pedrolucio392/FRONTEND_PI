// Função para atualizar a quantidade de itens no carrinho na navbar
function updateCartQuantity() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-quantity").textContent = totalQuantity;
}

// Chama a função para atualizar a quantidade quando a página carregar
window.onload = updateCartQuantity;

// Função para adicionar um livro ao carrinho
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
  // Manipula o clique nas miniaturas
  $(".thumbnail").click(function () {
    // Remove a classe 'border-black' de todas as miniaturas
    $(".thumbnail").removeClass("border-black");

    // Obtém o caminho da imagem da miniatura clicada
    var newImageSrc = $(this).attr("src");

    // Atualiza a imagem principal com o caminho da miniatura clicada
    $(".main-image").attr("src", newImageSrc);

    // Adiciona a classe 'border-black' à miniatura clicada
    $(this).addClass("border-black");
  });
});

function irParaCarrinho(product) {
  // Substitua 'outraPagina.html' pela URL da página para a qual deseja redirecionar
  window.location.href = "carrinho.html";
  addToCart(product);
}

document.addEventListener("DOMContentLoaded", function () {
  // Função para obter o ID do livro da URL
  function getBookIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  // Função para buscar o livro específico no JSON
  function fetchBookDetails(bookId) {
    fetch("http://localhost:3001/book/" + bookId) // Ajuste o caminho conforme necessário
      .then((response) => response.json())
      .then((book) => {
        displayBookDetails(book);
        setupAddToCartButton(book); // Configura o botão após carregar os detalhes
      })
      .catch((error) =>
        console.error("Erro ao buscar detalhes do livro:", error)
      );
  }

  // Função para exibir os detalhes do livro na página
  function displayBookDetails(book) {
    document.querySelector(".main-image").src = book.coverImage;
    document.querySelector("h2").textContent = book.title;
    document.querySelector(".price-instalments").textContent =
      "6x de " + (book.price / 6).toFixed(2).replace(".", ",");
    document.querySelector(".final-price").textContent =
      "R$ " + book.price.toFixed(2).replace(".", ",");
    document.querySelector(".pix-price").textContent =
      "R$ " + (book.price * 0.95).toFixed(2).replace(".", ",");
    document.querySelector(".miniatura1").src = book.miniatura1;
    document.querySelector(".miniatura2").src = book.miniatura2;
  }

  // Configurar o botão para adicionar ao carrinho
  function setupAddToCartButton(book) {
    const addToCartButton = document.getElementById("btn-addcart");

    addToCartButton.addEventListener("click", function () {
      // Adicionar o livro ao carrinho
      addToCart(book);

      // Redirecionar para a página do carrinho
      window.location.href = "carrinho.html";
    });
  }

  // Obtenha o ID do livro e busque os detalhes
  const bookId = getBookIdFromURL();
  if (bookId) {
    fetchBookDetails(bookId);
  }
});
