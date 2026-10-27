const form = document.querySelector("#checkoutForm");
const cepInput = document.querySelector("#cep");
const buscarCepButton = document.querySelector("#buscarCep");
const cepFeedback = document.querySelector("#cepFeedback");

function somenteNumeros(valor) {
  return valor.replace(/\D/g, "");
}

function formatarCep(valor) {
  const numeros = somenteNumeros(valor).slice(0, 8);
  if (numeros.length <= 5) return numeros;
  return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
}

function cepValido(cep) {
  return somenteNumeros(cep).length === 8;
}

cepInput?.addEventListener("input", () => {
  cepInput.value = formatarCep(cepInput.value);
});

buscarCepButton?.addEventListener("click", () => {
  if (!cepValido(cepInput.value)) {
    cepFeedback.textContent = "Digite um CEP válido antes de buscar.";
    cepInput.focus();
    return;
  }

  /*
    TODO PARA OS ALUNOS:
    1. limpar o CEP;
    2. fazer fetch para https://viacep.com.br/ws/CEP/json/;
    3. converter a resposta para JSON;
    4. tratar CEP inexistente e erros de rede;
    5. preencher logradouro, bairro, cidade e UF;
    6. informar carregamento, sucesso ou erro em cepFeedback.
  */

  cepFeedback.textContent = "CEP válido. A consulta à ViaCEP ainda precisa ser implementada.";
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  cepInput.setCustomValidity(cepValido(cepInput.value) ? "" : "CEP inválido");

  if (!form.checkValidity()) {
    form.classList.add("was-validated");
    form.querySelector(":invalid")?.focus();
    return;
  }

  const nome = document.querySelector("#nome").value.trim();
  sessionStorage.setItem("clienteNome", nome);
  sessionStorage.setItem("pedidoNumero", `PED-${Math.floor(100000 + Math.random() * 900000)}`);
  window.location.href = "sucesso.html";
});
