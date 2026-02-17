/* ======================== */
/* ELEMENTOS */
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const tipoSelect = document.getElementById("tipo");
const lista = document.getElementById("lista");
const saldoEl = document.getElementById("saldo");
const bgVideo = document.getElementById("bg-video");

/* ======================== */
/* LOCAL STORAGE */
let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

/* ======================== */
/* INICIALIZA */
renderizar();
iniciarVideo();

/* ======================== */
/* ADICIONAR */
function adicionar(event) {
  event.preventDefault();

  const descricao = descricaoInput.value.trim();
  const valor = Number(valorInput.value);
  const tipo = tipoSelect.value;

  if (descricao === "" || valor <= 0) return;

  transacoes.push({
    descricao,
    valor,
    tipo
  });

  salvar();
  renderizar();

  descricaoInput.value = "";
  valorInput.value = "";
  tipoSelect.value = "entrada";
}

/* ======================== */
/* RENDERIZAR */
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
      li.innerText = `➕ ${item.descricao} — ${valorFormatado}`;
    } else {
      saldo -= item.valor;
      li.innerText = `➖ ${item.descricao} — ${valorFormatado}`;
    }

    btn.innerText = "🗑️";
    btn.onclick = () => {
      transacoes.splice(index, 1);
      salvar();
      renderizar();
    };

    li.appendChild(btn);
    lista.appendChild(li);
  });

  saldoEl.innerText = saldo.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

/* ======================== */
/* SALVAR */
function salvar() {
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
}

/* ======================== */
/* VÍDEO DE FUNDO */
function iniciarVideo() {
  const videos = [
    "videos/money1.mp4"
    // depois você pode adicionar mais aqui
  ];

  const videoAleatorio = Math.floor(Math.random() * videos.length);
  bgVideo.src = videos[videoAleatorio];
}