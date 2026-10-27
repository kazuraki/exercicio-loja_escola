
const form = document.querySelector("#checkoutForm");
const cepInput = document.querySelector("#cep");
const buscarCepButton = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");

const produtoNome = document.querySelector("#produtoNome");
const produtoPreco = document.querySelector("#produtoPreco");
const totalCompra = document.querySelector("#totalCompra");

// Formata valores como moeda brasileira
function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Carrega o produto selecionado e atualiza o resumo
function carregarProduto() {
  if (!produtoNome || !produtoPreco || !totalCompra) return;

  try {
    const produtoSalvo = localStorage.getItem("produtoSelecionado");

    if (!produtoSalvo) {
      produtoNome.textContent = "Nenhum produto selecionado";
      produtoPreco.textContent = formatarMoeda(0);
      totalCompra.textContent = formatarMoeda(0);
      return;
    }

    const produto = JSON.parse(produtoSalvo);
    const preco = Number(produto?.preco);

    if (
      !produto ||
      typeof produto.nome !== "string" ||
      produto.nome.trim() === "" ||
      !Number.isFinite(preco) ||
      preco < 0
    ) {
      produtoNome.textContent = "Produto inválido";
      produtoPreco.textContent = formatarMoeda(0);
      totalCompra.textContent = formatarMoeda(0);
      return;
    }

    produtoNome.textContent = produto.nome;
    produtoPreco.textContent = formatarMoeda(preco);
    totalCompra.textContent = formatarMoeda(preco);
  } catch (erro) {
    console.error("Erro ao carregar o produto:", erro);

    produtoNome.textContent = "Erro ao carregar produto";
    produtoPreco.textContent = formatarMoeda(0);
    totalCompra.textContent = formatarMoeda(0);
  }
}

carregarProduto();

// Funções de validação e formatação do CEP
function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCep(valor) {
  const numeros = somenteNumeros(valor).slice(0, 8);

  if (numeros.length <= 5) {
    return numeros;
  }

  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

function cepValido(cep) {
  return somenteNumeros(cep).length === 8;
}

// Formata o CEP enquanto o usuário digita
cepInput?.addEventListener("input", () => {
  cepInput.value = formatarCep(cepInput.value);
  cepInput.setCustomValidity("");

  if (cepFeedback) {
    cepFeedback.textContent = "";
  }
});

// Valida o CEP
buscarCepButton?.addEventListener("click", () => {
  if (!cepInput || !cepFeedback) return;

  if (!cepValido(cepInput.value)) {
    cepInput.setCustomValidity("CEP inválido");
    cepFeedback.textContent =
      "Digite um CEP válido com 8 números.";

    cepInput.focus();
    return;
  }

  cepInput.setCustomValidity("");
  cepFeedback.textContent =
    "CEP válido. A consulta automática à ViaCEP ainda não foi implementada.";
});

// Validação e envio simulado do formulário
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (cepInput) {
    cepInput.setCustomValidity(
      cepValido(cepInput.value) ? "" : "CEP inválido"
    );
  }

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.querySelector(":invalid")?.focus();
    return;
  }

  const nomeInput = document.querySelector("#nome");
  const nome = nomeInput?.value.trim() || "";

  sessionStorage.setItem("clienteNome", nome);
  sessionStorage.setItem(
    "pedidoNumero",
    `PED-${Math.floor(100000 + Math.random() * 900000)}`
  );

  window.location.href = "sucesso.html";
});
