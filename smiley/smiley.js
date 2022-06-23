window.onload = main;

let px = 10;
let py = 10;
const sx = 20;
const sy = 20;
const canvv1 = document.querySelector("canvas#main");
const canvv2 = document.querySelector("canvas#extra");

const height = canvv1.height;
const width = canvv1.width;

canvv2.height = height;
canvv2.width = width;

const can = canvv1.getContext("2d");
const canExtra = canvv2.getContext("2d");

const blockk = height / sx;

function main() {
  console.log("succes");

  Draw();
  // setInterval(Draw, 200);
  addEventListener("keydown", (test) => {
    KeyPress(test.key);
  });
  return;
}

function Draw() {
  console.count(Math.floor(Date.now() / 1_000));
  canExtra.clearRect(0, 0, canvv2.width, canvv2.height);
  canExtra.fillStyle = "#000";
  canExtra.fillRect(blockk * px, blockk * py, blockk, blockk);
  requestAnimationFrame(Draw);

  return;
}

function blockDraw(corX, corY) {
  can.fillRect(blockk * corX, blockk * corY, blockk, blockk);
}

// rgba = (red,green,blue,doorzichtigheid)
function KeyPress(inp) {
  switch (inp) {
    case "ArrowLeft":
      px -= 1;
      if (px < 0) px = 19;
      break;
    case "ArrowDown":
      py += 1;
      if (py > 19) py = 0;
      break;
    case "ArrowRight":
      px += 1;
      if (px > 19) px = 0;
      break;
    case "ArrowUp":
      py -= 1;
      if (py < 0) py = 19;
      break;
    case "p":
      can.fillStyle = "#f00";
      blockDraw(px, py);
      break;
    case "q":
      can.fillStyle = "#f00";
      blockDraw(px, py);
      break;
    case "w":
      can.fillStyle = "#00f";
      blockDraw(px, py);
      break;
    case "s":
      can.fillStyle = "#0f0";
      blockDraw(px, py);
      break;
    case "x":
      can.fillStyle = "#000";
      blockDraw(px, py);
      break;
    case "a":
      can.fillStyle = "#fff";
      blockDraw(px, py);
      break;
    default:
      break;
  }
}
