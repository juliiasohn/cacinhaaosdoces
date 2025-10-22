const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
let score = 0;
let lives = 3;
let basketX = 180;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && basketX > 0) basketX -= 20;
  if (e.key === "ArrowRight" && basketX < 360) basketX += 20;
  basket.style.left = basketX + "px";
});

function createItem() {
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
        if (item.textContent === "🍬") score += 10;
        else lives -= 1;
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
  clearInterval(game);
  alert(`🎃 Fim de jogo! Pontuação: ${score}`);
  location.reload();
}
