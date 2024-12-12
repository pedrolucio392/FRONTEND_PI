
// cards do catálogo

var catalogoCompleto = [
    {
      title: "Tratado da Verdadeira Devoção à Santíssima Virgem (São Luís Montfort) - capa dura",
      coverImage: "https://cdn.awsli.com.br/400x400/478/478284/produto/157553032/21-tratado---mockup-6mdr3o7utv.png",
      price: 46.20,
      buyLink: "../../carrinho.html"
    },
    {
      title: "Vida de São Mauro (Fausto de Monte Cassino)",
      coverImage: "https://cdn.awsli.com.br/400x400/478/478284/produto/228201698/31-vida-sa-o-mauro---mockup-kzx6gr5lai.png",
      price: 23.56,
      buyLink: "../../carrinho.html"
    },
    {
        title: "Autoaperfeiçoamento - Rudolf Allers (CAPA DURA)",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/226278119/photo_2023-07-24_00-18-51-y9xwrs0kae.jpg",
        price: 84.90,
        buyLink: "../../carrinho.html"
    },
    {
        title: "Educação Sexual e Relações Humanas - Rudolf Allers (Capa Dura)",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/245429878/frente-guy6xdc36y.jpg",
        price: 89.90,
        buyLink: "../../carrinho.html"
    },
    {
        title: "Combo Poemas - Sergio de Carvalho Pachá",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/231037583/sem-t-tulo-1-63t9qo4vum.jpg",
        price: 97.80,
        buyLink: "../../carrinho.html"
    },
    {
        title: "Imitação de Cristo - Tomás de Kempis (CAPA DURA)",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/106653494/bd9233f774.jpg",
        price: 49.90,
        buyLink: "../../carrinho.html"
    },
    {
        title: "Catecismo de São Pio X (Ilustrado e Comentado)",
        coverImage: "assets/images/livro2.jpg",
        price: 34.99,
        buyLink: "../../carrinho.html"
    },
    {
        title: "O Criador e a Criatura - as Maravilhas do Amor Divino (Pe. William Faber)",
        coverImage: "https://cdn.awsli.com.br/400x400/478/478284/produto/242091415/o-criador-e-a-criatura_capa-3d-para-loja-l4hk68e3nn.png",
        price: 124.60,
        buyLink: "../../carrinho.html"
    },
    {
        title: "Combo Psicologia Tomista (8 livros)",
        coverImage: "assets/images/livro1.jpg",
        price: 460.98,
        buyLink: "../../carrinho.html"
    },
    {
        title: "Santo Tomás de Aquino - João Ameal (CAPA DURA)",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/237907702/mockup-pbe8wtwdcf.png",
        price: 84.90,
        buyLink: "../../carrinho.html"
    },
    {
        title: "História de Portugal: Das Origens até 1940 - João Ameal (CAPA DURA)",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/169051827/8164e56bf4.jpg",
        price: 112.00,
        buyLink: "../../carrinho.html"
    },
    {
        title: "História da Companhia de Jesus (2 volumes em 1) - (CAPA DURA)",
        coverImage: "https://cdn.awsli.com.br/300x300/618/618258/produto/50167778/photo_2023-07-17_16-12-29-conuhgzcq7.jpg",
        price: 74.90,
        buyLink: "../../carrinho.html"
    },
  ];

// Função para criar cards de produtos
// Função para criar cards de produtos
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
    

        if (product.price < 50) {
            var promotionBar = document.createElement("div");
            promotionBar.className = "promotion-bar";
        
            promotionBar.textContent = "30% OFF";
            
            card.appendChild(promotionBar);
        }
    
        else {
            var promotionBar = document.createElement("div");
            promotionBar.className = "promotion-bar";
        
            promotionBar.textContent = "50% OFF";
            
            card.appendChild(promotionBar);
        }

        var img = document.createElement('img');
        img.src = product.coverImage;
        img.className = 'card-img-top';
        img.alt = product.title;

        img.addEventListener("click", function() {
            window.location.href = '../../produto.html'; // Redireciona para a página HTML desejada
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
        buyLink.href = product.buyLink;
        buyLink.className = 'btn btn-primary btn-cards';
        buyLink.textContent = 'Adicionar ao carrinho';

        cardBody.appendChild(title);
        cardBody.appendChild(price);
        cardBody.appendChild(buyLink);

        card.appendChild(img);
        card.appendChild(cardBody);

        container.appendChild(card);
        
      });
    });
  }

// Chamada da função para criar os cards de produtos
createProductCards(catalogoCompleto);
