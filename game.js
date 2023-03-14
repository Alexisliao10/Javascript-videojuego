const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

const btnUP = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");

let canvasSize;
let elementSize;
const playerPosition = {
  x: undefined,
  y: undefined,
};

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  canvas.setAttribute("height", canvasSize);
  canvas.setAttribute("width", canvasSize);

  elementSize = canvasSize / 10;
  startGame();
}

function startGame() {
  game.font = `${elementSize}px Verdana`;
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));

  mapRowsCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      // for (let x = 1; x <= 10; x++) {
      //   // x for row and y for col
      //   for (let y = 1; y <= 10; y++) {
      //     game.fillText(
      //       emojis[mapRowsCols[x - 1][y - 1]],
      //       elementSize * y,
      //       elementSize * x
      //     );
      //   }
      // }

      if (col === "O") {
        playerPosition.x = posX;
        playerPosition.y = posY;
      }

      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

document.addEventListener("keydown", moveByKeys);
btnUP.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

function moveByKeys(event) {
  if (event.key === "w") moveUp();
  else if (event.key === "s") moveDown();
  else if (event.key === "a") moveLeft();
  else if (event.key === "d") moveRight();
}

function moveUp() {
  playerPosition.y -= elementSize;
  movePlayer();
}
function moveDown() {
  playerPosition.y += elementSize;

  movePlayer();
}
function moveLeft() {
  playerPosition.x -= elementSize;

  movePlayer();
}
function moveRight() {
  playerPosition.x += elementSize;

  movePlayer();
}
