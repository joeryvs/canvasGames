window.onload = main;
console.log("mousemove imported");

const glob = document.querySelector("p#cordinatesCanv");
const canv = document.querySelector("p#cordinatesScreen");
const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");

const winText = document.getElementById("winner");
const turnText = document.getElementById("turn");

const amountX = 3;
const amountY = 3;
const blX = canvas.width / amountX;
const blY = canvas.height / amountY;
let playerOneTurn = true;
let isGameFinished = false;
const playerOneSymbol = "X";
const playerTwoSymbol = "O";
const ansers = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9 };
window.addEventListener("mousedown", (ev) => {
  //   console.log(ev);
  globalMousemove(ev.currentTarget, ev.offsetX, ev.offsetY);
});

canvas.addEventListener("mousedown", (ev) => {
  console.debug(ev);
  canvasMousemove(ev.currentTarget, ev.offsetX, ev.offsetY);
  blockSelect(ev.offsetX, ev.offsetY);
});

function DrawLine(x1, y1, x2, y2) {
  art.strokeStyle = "#000";
  art.beginPath();
  art.lineTo(x1, y1);
  art.lineTo(x2, y2);
  art.stroke();
  art.closePath();
  return;
}

function LinesDraw() {
  DrawLine(blX, 0, blX, canvas.height);
  DrawLine(blX * 2, 0, blX * 2, canvas.height);
  DrawLine(0, blY, canvas.width, blY);
  DrawLine(0, blY * 2, canvas.width, blY * 2);
}

function globalMousemove(...args) {
  let str = "";
  args.forEach((element) => {
    str += element;
    str += "\n";
  });
  glob.innerHTML = str;
}

function canvasMousemove(...args) {
  let str = "";
  args.forEach((element) => {
    str += element;
    str += "\n";
  });
  canv.innerHTML = str;
}

function blockSelect(X, Y) {
  x = Math.floor(X / blX) + 1;
  y = Math.floor(Y / blY);
  const ans = y * 3 + x;
  const q = document.querySelector("p#len");
  q.innerHTML = `${x} , ${y} == ${ans}`;
  if (!isGameFinished) PlayerHasChosen(ans);
  return ans;
}

function main() {
  console.log("succes");
  DRaw();
}
window.addEventListener("keypress", (ev) => {
  keyInput(ev.key);
});
function DRaw() {
  art.clearRect(0, 0, canvas.width, canvas.height);
  LinesDraw();
  art.font = blY * 0.4 + "px sans-serif";
  art.textAlign = "center";
  for (let Xcorr = 1; Xcorr <= amountX * amountY; Xcorr++) {
    let Ycor = Math.floor((Xcorr - 1) / amountX);
    let Xcor = Math.floor((Xcorr - 1) % amountX);
    art.fillStyle = "#000";
    art.fillText(
      ansers[Xcorr],
      Xcor * blX + blX * 0.5,
      Ycor * blY + blY * 0.6,
      blX
    );
  }
  if (checkWin()) {
    isGameFinished = true;
    WinnertXT();
    window.removeEventListener("keypress", (ev) => {
      keyInput(ev.key);
    });
    return;
  }

  turnINdicator();
  return;
}

function turnINdicator() {
  const str = playerOneTurn
    ? "Player one who draws X is now playing"
    : "Player two who draws O is now playing";
  turnText.innerText = str;
  return;
}

function WinnertXT() {
  const str = !playerOneTurn ? "Player one wins" : "Speler 2 wint";
  winText.innerText = str;
  return;
}

function keyInput(button) {
  switch (button) {
    case "q":
      console.log(playerOneTurn);
      break;
    case "r":
      console.log("r pressed");
      break;
    case "w":
      console.log(ansers);
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if (!isGameFinished) PlayerHasChosen(button);
      break;
    default:
      break;
  }
}

function PlayerHasChosen(inputt) {
  if (!(ansers[inputt] === "X" || ansers[inputt] === "O")) {
    ansers[inputt] = playerOneTurn ? playerOneSymbol : playerTwoSymbol;
    playerOneTurn = !playerOneTurn;
    DRaw();
    return;
  }
  turnText.innerText = "wrong option";
  return;
}

function checkWin() {
  for (let i = 4; i < 7; i++) {
    if (ansers[i - 3] === ansers[i] && ansers[i] === ansers[i + 3]) return true;
  }
  for (let i = 1; i < 9; i += 3) {
    if (ansers[i] === ansers[i + 1] && ansers[i] === ansers[i + 2]) return true;
  }
  if (ansers[1] === ansers[5] && ansers[5] === ansers[9]) return true;

  if (ansers[3] === ansers[5] && ansers[5] === ansers[7]) return true;

  return false;
}
