const mensagemCliente = document.querySelector("#mensagemCliente");
const numeroPedido = document.querySelector("#numeroPedido");
const nome = sessionStorage.getItem("clienteNome");
const pedido = sessionStorage.getItem("pedidoNumero");

if (nome) {
  mensagemCliente.textContent = `${nome}, seus dados foram validados e o fluxo educacional chegou ao final.`;
}

if (pedido) {
  numeroPedido.textContent = pedido;
}

/* TODO: tratar melhor o acesso direto a esta página. */
