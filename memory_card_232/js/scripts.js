// Pegando os elementos do HTML
const cards = document.querySelectorAll(".memory-card");
const startButton = document.querySelector("#start");
const timer = document.querySelector("#timer");

// Variáveis do jogo
let primeiraCarta;
let segundaCarta;
let bloqueado = false;
let pares = 0;

let segundos = 0;
let tempo;

// Função para virar a carta
function virarCarta() {

  // Não deixa clicar enquanto duas cartas estão sendo comparadas
  if (bloqueado) {
    return;
  }

  // Não deixa clicar duas vezes na mesma carta
  if (this === primeiraCarta) {
    return;
  }

  // Vira a carta
  this.classList.add("flip");

  // Se for a primeira carta
  if (!primeiraCarta) {
    primeiraCarta = this;
    return;
  }

  // Se for a segunda carta
  segundaCarta = this;

  verificarPar();
}

// Verifica se as duas cartas são iguais
function verificarPar() {

  let mesmoPar =
    primeiraCarta.dataset.framework === segundaCarta.dataset.framework;

  if (mesmoPar) {
    desativarCartas();
  } else {
    desvirarCartas();
  }
}

// Quando encontrar um par
function desativarCartas() {

  primeiraCarta.removeEventListener("click", virarCarta);
  segundaCarta.removeEventListener("click", virarCarta);

  pares++;

  resetarCartas();

  // São 6 pares
  if (pares === 6) {
    clearInterval(tempo);
    alert("Parabéns! Você encontrou todos os pares!");
  }
}

// Quando as cartas forem diferentes
function desvirarCartas() {

  bloqueado = true;

  setTimeout(function () {

    primeiraCarta.classList.remove("flip");
    segundaCarta.classList.remove("flip");

    resetarCartas();

  }, 1000);
}

// Limpa as cartas selecionadas
function resetarCartas() {

  primeiraCarta = null;
  segundaCarta = null;
  bloqueado = false;
}

// Embaralha as cartas
function embaralhar() {

  cards.forEach(function(card) {

    let numero = Math.floor(Math.random() * 12);

    card.style.order = numero;

  });
}

// Inicia o jogo
function iniciarJogo() {

  // Zera o jogo
  pares = 0;
  segundos = 0;

  timer.innerHTML = "00:00";

  // Todas as cartas voltam para o estado inicial
  cards.forEach(function(card) {

    card.classList.remove("flip");
    card.addEventListener("click", virarCarta);

  });

  // Embaralha
  embaralhar();

  // Começa o cronômetro
  clearInterval(tempo);

  tempo = setInterval(function() {

    segundos++;

    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = segundos % 60;

    if (minutos < 10) {
      minutos = "0" + minutos;
    }

    if (segundosRestantes < 10) {
      segundosRestantes = "0" + segundosRestantes;
    }

    timer.innerHTML = minutos + ":" + segundosRestantes;

  }, 1000);
}

// Botão iniciar
startButton.addEventListener("click", iniciarJogo);