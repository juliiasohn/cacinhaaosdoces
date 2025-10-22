const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const gameContainer = document.getElementById("gameContainer");

const bgMusic = document.getElementById("bgMusic");
const candySound = document.getElementById("candySound");
const pumpkinSound = document.getElementById("pumpkinSound");
const gameOverSound = document.getElementById("gameOverSound");

let score = 0;
let lives = 3;
let basketX = 180;
let gameRunning = false;
let game;

// movimento do cesto
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && basketX > 0) basketX -= 20;
  if (e.key === "ArrowRight" && basketX < 360) basketX += 20;
  basket.style.left = basketX + "px";
});

// início do jogo
startBtn.addEventListener("click", startGame);

function startGame() {
  startScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  bgMusic.play();
  score = 0;
  lives = 3;
  gameRunning = true;
  document.getElementById("score").textContent = score;
  document.getElementById("lives").textContent = lives;

  game = setInterval(createItem, 700);
  setTimeout(() => endGame(), 30000); // 30 segundos
}

function createItem() {
  if (!gameRunning) return;

  const item = document.createElement("div");
  item.classList.add("item");
  const isCandy = Math.random() < 0.7;
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

function endGame() {
  if (!gameRunning) return;
  gameRunning = false;
  clearInterval(game);
  bgMusic.pause();
  gameOverSound.play();
  setTimeout(() => {
    alert(`🎃 Fim de jogo! Pontuação final: ${score}`);
    location.reload();
  }, 1000);
}
