// Define qual jogador começa
let jogadorAtual = "X";


let tabuleiro = ["", "", "", "", "", "", "", "", ""];

// Indica se o jogo terminou (vitória ou empate)
let fimDeJogo = false;

// Seleciona todas as células do jogo
const celulas = document.querySelectorAll(".celula");


const mensagem = document.getElementById("mensagem");


celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    const index = celula.dataset.index; // Pega o índice da célula clicada

    // Só permite jogar se a célula estiver vazia e o jogo não tiver acabado
    if (tabuleiro[index] === "" && !fimDeJogo) {
      tabuleiro[index] = jogadorAtual; 
      celula.textContent = jogadorAtual; 

      
      if (verificarVencedor()) {
        mensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
        fimDeJogo = true;
      }
      
      else if (tabuleiro.every(c => c !== "")) {
        mensagem.textContent = "Empate!";
        fimDeJogo = true;
      }
      
      else {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
      }
    }
  });
});

// Função que verifica todas as combinações vencedoras
function verificarVencedor() {
  const combinacoes = [
    [0,1,2], [3,4,5], [6,7,8], // Linhas
    [0,3,6], [1,4,7], [2,5,8], // Colunas
    [0,4,8], [2,4,6]           // Diagonais
  ];


  for (let combinacao of combinacoes) {
    const [a, b, c] = combinacao;

   
    if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[b] === tabuleiro[c]) {
      
      combinacao.forEach(i => celulas[i].classList.add("vencedor"));
      return true;
    }
  }

  return false;
}


function reiniciar() {
  
  tabuleiro = ["", "", "", "", "", "", "", "", ""];


  fimDeJogo = false;

  
  jogadorAtual = "X";

  
  celulas.forEach(celula => {
    celula.textContent = "";
    celula.classList.remove("vencedor");
  });

  
  mensagem.textContent = "";
}

