
const inputFiltro = document.querySelector("#filtroProduto");
const produtos = document.querySelectorAll(".product-item");
const mensagemFiltro = document.querySelector("#mensagemFiltro");

// Filtro de produtos
function filtrarProdutos() {
  if (!inputFiltro) return;

  const termo = inputFiltro.value.trim().toLowerCase();
  let quantidadeVisivel = 0;

  produtos.forEach((produto) => {
    const nome = (produto.dataset.name || "").toLowerCase();
    const deveAparecer = nome.includes(termo);

    produto.hidden = !deveAparecer;

    if (deveAparecer) {
      quantidadeVisivel++;
    }
  });

  if (!mensagemFiltro) return;

  if (!termo) {
    mensagemFiltro.textContent = "";
  } else if (quantidadeVisivel === 0) {
    mensagemFiltro.textContent = "Nenhum produto encontrado.";
  } else {
    mensagemFiltro.textContent =
      `${quantidadeVisivel} produto(s) encontrado(s).`;
  }
}

inputFiltro?.addEventListener("input", filtrarProdutos);

// Seleção do produto e redirecionamento para o checkout
const botoesComprar = document.querySelectorAll(".btn-comprar");

botoesComprar.forEach((botao) => {
  botao.addEventListener("click", () => {
    const nome = botao.dataset.nome?.trim();
    const preco = Number(botao.dataset.preco);

    if (!nome || botao.dataset.preco === undefined ||
        !Number.isFinite(preco) || preco < 0) {
      alert("Não foi possível identificar o nome ou o preço do produto.");
      return;
    }

    const produto = { nome, preco };

    localStorage.setItem(
      "produtoSelecionado",
      JSON.stringify(produto)
    );

    window.location.href = "checkout.html";
  });
});
