const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoSelect = document.getElementById("tipo");
const lista = document.getElementById("lista");
const saldoEl = document.getElementById("saldo");
const bgVideo = document.getElementById("bg-video");

let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

renderizar();
iniciarVideo();

function adicionar(event) {
  event.preventDefault();

  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoSelect.value;

  if (!descricao || valor <= 0) return;

  transacoes.push({ descricao, valor, tipo });
  salvar();
  renderizar();

  descricaoInput.value = "";
  valorInput.value = "";
  tipoSelect.value = "entrada";
}

function renderizar() {
  lista.innerHTML = "";
  let saldo = 0;

  transacoes.forEach((item, index) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    li.classList.add(item.tipo);

    const valorFormatado = item.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

    if (item.tipo === "entrada") {
      saldo += item.valor;
      li.textContent = `➕ ${item.descricao} — ${valorFormatado}`;
    } else {
      saldo -= item.valor;
      li.textContent = `➖ ${item.descricao} — ${valorFormatado}`;
    }

    btn.textContent = "🗑️";
    btn.onclick = () => {
      transacoes.splice(index, 1);
      salvar();
      renderizar();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });

  saldoEl.textContent = saldo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function salvar() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

function iniciarVideo() {
  const videos = ["./Videos/money1.mp4"];
  const videoAleatorio = Math.floor(Math.random() * videos.length);
  bgVideo.src = videos[videoAleatorio];
}
