const start = "start";
console.time(start);

window.ondblclick = action;


function unoMas() {
  const diiv = document.getElementById("Container");
  diiv.innerHTML += '<canvas width="240" height="240"></canvas>';
  action();
}

function action() {
  const allCanvasss = document.getElementsByTagName("canvas");
  const size = 240;
  const mid = size * 0.5;
  for (const canv of allCanvasss) {
    const can = canv.getContext("2d");
    const Block = size / rN(80, 10);
    // console.log(canv);
    // console.log(can);
    canv.setAttribute("height", size);
    canv.setAttribute("width", size);
    can.lineWidth = 5;
    can.fillStyle = rFull();
    can.shadowColor = "rgba(0, 100, 100, 50)";
    can.strokeStyle = rShort();

    can.ellipse(mid, mid, 100, 100, 0, 0, 2 * Math.PI, false);
    can.fillStyle = rFull();
    can.beginPath();
    for (let StartX = 0; StartX < size; StartX += Block) {
      for (let StartY = 0; StartY < size; StartY += Block) {
        can.fillStyle = rFull();
        can.fillRect(StartX, StartY, Block, Block);
      }
    }
    can.closePath();
  }
}

function rHex3() {
  return Math.floor(Math.random() * Math.pow(2, 12))
    .toString("16")
    .padStart(3, "0");
}
function rHex2() {
  return Math.floor(Math.random() * Math.pow(2, 8))
    .toString("16")
    .padStart(2, "0");
}
function rHexAny(num) {
  return Math.floor(Math.random() * Math.pow(2, 4 * num))
    .toString("16")
    .padStart(num, "0");
}

function rOneNumber() {
  const x = 16;
  return Math.floor(Math.random() * x)
    .toString(x)
    .charAt(0);
}

function rShort() {
  return `#${rOneNumber()}${rOneNumber()}${rOneNumber()}`;
}
function rFull() {
  return `#${rOneNumber()}${rOneNumber()}${rOneNumber()}${rOneNumber()}${rOneNumber()}${rOneNumber()}`;
}

function rN(max = 200, min = 0) {
  return Math.floor(Math.random() * (max-min) + min);
}

window.onload = action;
console.timeEnd(start);
