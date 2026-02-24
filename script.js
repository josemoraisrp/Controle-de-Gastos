const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoSelect = document.getElementById("tipo");
const form = document.getElementById("formGastos");
const lista = document.getElementById("lista");
const saldoEl = document.getElementById("saldo");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];
let saldo = 0;

// 👉 Atualiza tela inteira
function atualizarTela() {
  lista.innerHTML = "";
  saldo = 0;

  gastos.forEach((item, index) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.innerText = `${item.descricao} - R$ ${item.valor} (${item.tipo})`;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.innerText = "🗑️";
    botaoExcluir.style.marginLeft = "10px";

    botaoExcluir.addEventListener("click", function () {
      gastos.splice(index, 1);
      localStorage.setItem("gastos", JSON.stringify(gastos));
      atualizarTela();
    });

    li.appendChild(texto);
    li.appendChild(botaoExcluir);
    lista.appendChild(li);
    if (item.tipo === "entrada") {
  li.classList.add("entrada");
} else {
  li.classList.add("saida");
}

    if (item.tipo === "entrada") {
      saldo += item.valor;
    } else {
      saldo -= item.valor;
    }
  });

  saldoEl.innerText = `R$ ${saldo.toFixed(2)}`;
}

// 👉 Evento do formulário
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoSelect.value;

  // 🔐 VALIDAÇÃO
  if (descricao === "" || valor <= 0) {
    alert("Preencha corretamente descrição e valor.");
    return;
  }

  const novoGasto = {
    descricao,
    valor,
    tipo,
  };

  gastos.push(novoGasto);
  localStorage.setItem("gastos", JSON.stringify(gastos));

  atualizarTela();

  descricaoInput.value = "";
  valorInput.value = "";
});

// 👉 Carrega dados ao abrir
atualizarTela();
