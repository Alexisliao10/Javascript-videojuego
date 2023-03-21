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
let level = 0;
let lives = 3;

const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};

let bombPosition = [];

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  canvas.setAttribute("height", canvasSize);
  canvas.setAttribute("width", canvasSize);
  elementSize = canvasSize / 10.2;

  // reiniciando posicion del jugador cuando se iniciar el canvas
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function startGame() {
  game.font = `${elementSize}px Verdana`;
  game.textAlign = "end";

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split("\n");
  const mapRowsCols = mapRows.map((row) => row.trim().split(""));

  bombPosition = [];
  game.clearRect(0, 0, canvasSize, canvasSize);

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

      if (col === "O" && !playerPosition.x && !playerPosition.y) {
        playerPosition.x = posX;
        playerPosition.y = posY;
      } else if (col === "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } else if (col === "X") {
        bombPosition.push({
          x: posX,
          y: posY,
        });
      }
      game.fillText(emoji, posX, posY);
    });
  });
  movePlayer();
}

function movePlayer() {
  // subir de nivel
  const levelUpinX = playerPosition.x.toFixed(2) === giftPosition.x.toFixed(2);
  const levelUpinY = playerPosition.y.toFixed(2) === giftPosition.y.toFixed(2);
  const levelUp = levelUpinX && levelUpinY;

  if (levelUp) {
    // subir de nivel
    levelWin();
  }

  // bomba encontrado

  const bombCollision = bombPosition.find((enemy) => {
    const bombInX = enemy.x.toFixed(2) === playerPosition.x.toFixed(2);
    const bombInY = enemy.y.toFixed(2) === playerPosition.y.toFixed(2);
    return bombInX && bombInY;
  });

  if (bombCollision) {
    // perder vida al chocar con una bomba
    levelFail();
  }
  // posicion del jugador y renderizado
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function levelFail() {
  lives--;
  if (lives === 0) {
    level = 0;
    lives = 3;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log("ganaste el juego");
}
// movimientos del jugador
document.addEventListener("keydown", moveByKeys);
btnUP.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

function moveByKeys(event) {
  if (event.key === "w" || event.key === "ArrowUp") moveUp();
  else if (event.key === "s" || event.key === "ArrowDown") moveDown();
  else if (event.key === "a" || event.key === "ArrowLeft") moveLeft();
  else if (event.key === "d" || event.key === "ArrowRight") moveRight();

  event.preventDefault();
}

function moveUp() {
  // limite arriba (y)
  if (Math.ceil(playerPosition.y) - elementSize < elementSize) {
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }
}
function moveDown() {
  // limite abajo (y)
  if (Math.floor(playerPosition.y) + elementSize > canvasSize) {
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}
function moveLeft() {
  // limite izquierdo (x)
  if (Math.ceil(playerPosition.x) - elementSize < elementSize) {
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }
}
function moveRight() {
  if (Math.floor(playerPosition.x) + elementSize > canvasSize) {
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}
