$(document).ready(function() {
  // Manipula o clique nas miniaturas
  $('.thumbnail').click(function() {
    // Remove a classe 'border-black' de todas as miniaturas
    $('.thumbnail').removeClass('border-black');

    // Obtém o caminho da imagem da miniatura clicada
    var newImageSrc = $(this).attr('src');

    // Atualiza a imagem principal com o caminho da miniatura clicada
    $('.main-image').attr('src', newImageSrc);

    // Adiciona a classe 'border-black' à miniatura clicada
    $(this).addClass('border-black');
  });
});

function irParaCarrinho() {
  // Substitua 'outraPagina.html' pela URL da página para a qual deseja redirecionar
  window.location.href = '../../carrinho.html';
}



document.addEventListener("DOMContentLoaded", function() {
  // Função para obter o ID do livro da URL
  function getBookIdFromURL() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
  }

  // Função para buscar o livro específico no JSON
  function fetchBookDetails(bookId) {
      fetch('http://localhost:3000/books/' + bookId)  // Ajuste o caminho conforme necessário
          .then(response => response.json())
          .then(book => {
              displayBookDetails(book);
          })
          .catch(error => console.error('Erro ao buscar detalhes do livro:', error));
  }

  // Função para exibir os detalhes do livro na página
  function displayBookDetails(book) {
      document.querySelector(".main-image").src = book.coverImage;
      document.querySelector("h2").textContent = book.title;
      document.querySelector(".price-instalments").textContent = '6x de ' + (book.price / 6).toFixed(2).replace('.', ',');
      document.querySelector(".final-price").textContent = 'R$ ' + book.price.toFixed(2).replace('.', ',');
      document.querySelector(".pix-price").textContent = 'R$ ' + (book.price * 0.95).toFixed(2).replace('.', ',');
      document.querySelector(".miniatura1").src = book.miniatura1;
      document.querySelector(".miniatura2").src = book.miniatura2;
    }

  // Obtenha o ID do livro e busque os detalhes
  const bookId = getBookIdFromURL();
  if (bookId) {
      fetchBookDetails(bookId);
  }
});