const formProduto = document.querySelector("#formProduto");
const quantidade = document.querySelector("#quantidade");
const feedback = document.querySelector("#produtoFeedback");

formProduto?.addEventListener("submit", (event) => {
  event.preventDefault();
  const quantidadeEscolhida = Number(quantidade.value);

  if (quantidadeEscolhida < 1 || quantidadeEscolhida > 10) {
    feedback.textContent = "Escolha uma quantidade entre 1 e 10.";
    quantidade.focus();
    return;
  }

  sessionStorage.setItem("quantidade", String(quantidadeEscolhida));
  window.location.href = "checkout.html";
});

/* TODO: usar URLSearchParams para carregar o produto conforme o id da URL. */
