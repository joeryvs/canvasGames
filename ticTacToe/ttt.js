window.onload = main;

const canvas = document.querySelector("canvas");
const can = canvas.getContext("2d");

const winText = document.getElementById("winner");
const turnText = document.getElementById("turn");
// console.log(winText,turnText);

const height = canvas.height;
const widht = canvas.width;

const amountX = 3;
const amountY = 3;
const blX = widht / amountX;
const blY = widht / amountY;
let playerOneTurn = true;
const playerOneSymbol = "X";
const playerTwoSymbol = "O";
const ansers = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

function main() {
  console.log("succes");
  //   setInterval(DRaw, 2000);
  DRaw();
  window.addEventListener("keypress", (ev) => {
    keyInput(ev.key);
  });
}
function DRaw() {
  can.clearRect(0, 0, widht, height);
  can.font = blY * 0.4 + "px sans-serif";
  can.textAlign = "center";
  for (let Xcorr = 1; Xcorr <= amountX * amountY; Xcorr++) {
    let Ycor = Math.floor((Xcorr - 1) / amountX);
    let Xcor = Math.floor((Xcorr - 1) % amountX);

    can.fillStyle = RandomColor();
    can.fillRect(Xcor * blX, Ycor * blY, blX, blY);
    // can.fillStyle = RandomColor();
    can.fillStyle = "#000";
    can.fillText(
      ansers[Xcorr],
      Xcor * blX + blX * 0.5,
      Ycor * blY + blY * 0.6,
      blX
    );
  }
  if (checkWin()) {
    WinnertXT();
    window.addEventListener("keypress", (ev) => {
      console.log(ev);
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

function RandomColor() {
  const z = Math.floor(Math.random() * Math.pow(2, 12));
  const w = z.toString(16);
  const q = w.padStart(3, "0");
  const ans = "#" + q;
  return ans;
}

function keyInput(button) {
  console.log(button);
  switch (button) {
    case "q":
      console.log(playerOneTurn);
      break;
    case "r":
      console.log("r kwy pressed");
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
      console.log(button);
      if (!(ansers[button] === "X" || ansers[button] === "O")) {
        ansers[button] = playerOneTurn ? playerOneSymbol : playerTwoSymbol;
        playerOneTurn = !playerOneTurn;
        DRaw();
        return
    }
    
    turnText.innerText = "wrong option";
      break;
    default:
      break;
  }
}

function checkWin() {
  for (let i = 4; i < 7; i++) {
    if (ansers[i - 3] === ansers[i] && ansers[i] === ansers[i + 3]) {
      return true;
    }
  }
  for (let i = 1; i < 9; i += 3) {
    if (ansers[i] === ansers[i + 1] && ansers[i] === ansers[i + 2]) {
      return true;
    }
  }
  if (ansers[1] === ansers[5] && ansers[5] === ansers[9]) {
    return true;
  }
  if (ansers[3] === ansers[5] && ansers[5] === ansers[7]) {
    return true;
  }
  return false;
}
