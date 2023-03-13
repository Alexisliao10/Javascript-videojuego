const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

let canvasSize;
let elementSize;

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
      game.fillText(emoji, posX, posY);
    });
  });

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
}
