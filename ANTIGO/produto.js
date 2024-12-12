

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