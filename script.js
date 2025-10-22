const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const bgMusic = document.getElementById("bgMusic");
const candySound = document.getElementById("candySound");
const pumpkinSound = document.getElementById("pumpkinSound");
const gameOverSound = document.getElementById("gameOverSound");

let score = 0;
let lives = 3;
let basketX = 180;
let gameRunning = true;

// Inicia música de fundo quando o jogador pressiona uma tecla
document.addEventListener("keydown", (e) => {
  if (bgMusic.paused) bgMusic.play();

  if (e.key === "ArrowLeft" && basketX > 0) basketX -= 20;
  if (e.key === "ArrowRight" && basketX < 360) basketX += 20;
  basket.style.left = basketX + "px";
});

function createItem() {
  if (!gameRunning) return;

  const item = document.createElement("div");
  item.classList.add("item");
  const isCandy = Math.random() < 0.7; // 70% chance de ser doce
  item.textContent = isCandy ? "🍬" : "🎃";
  item.style.left = Math.random() * 370 + "px";
  item.style.top = "0px";
  gameArea.appendChild(item);

  const fall = setInterval(() => {
    let top = parseInt(item.style.top);
    if (top < 460) {
      item.style.top = top + 5 + "px";
    } else {
      // colisão
      if (Math.abs(basketX - parseInt(item.style.left)) < 40) {
        if (item.textContent === "🍬") {
          score += 10;
          candySound.currentTime = 0;
          candySound.play();
        } else {
          lives -= 1;
          pumpkinSound.currentTime = 0;
          pumpkinSound.play();
        }
        document.getElementById("score").textContent = score;
        document.getElementById("lives").textContent = lives;
      }
      clearInterval(fall);
      item.remove();
      if (lives <= 0) endGame();
    }
  }, 50);
}

let game = setInterval(createItem, 700);
setTimeout(() => endGame(), 30000);

function endGame() {
  if (!gameRunning) return;
  gameRunning = false;
  clearInterval(game);
  bgMusic.pause();
  gameOverSound.play();
  setTimeout(() => {
    alert(`🎃 Fim de jogo! Pontuação: ${score}`);
    location.reload();
  }, 1000);
}
