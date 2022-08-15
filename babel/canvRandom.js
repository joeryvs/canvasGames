const start = "start";

window.ondblclick = action;

function unoMas() {
  const diiv = document.querySelector("#Container");
  diiv.innerHTML += '<canvas width="240" height="240"></canvas>';
  action();
}

function action() {
  console.time(start);
  const allCanvasss = document.querySelectorAll("canvas");
  const size = 240;
  for (const canv of allCanvasss) {
    setTimeout(() => {
      singleCanvDrawwing(canv,size)
    }, 1);
  }
  console.timeEnd(start);
}

function singleCanvDrawwing(canvvv, sizes){
  const can = canvvv.getContext("2d");
    for (let StartX = 0; StartX < sizes; StartX++) {
      for (let StartY = 0; StartY < sizes; StartY++) {
        can.fillStyle = rFull();
        can.fillRect(StartX, StartY, 1, 1);
      }
    }
  return
}

function rHexAny(num) {
  return Math.floor(Math.random() * Math.pow(2, 4 * num))
    .toString("16")
    .padStart(num, "0");
}

function rShort() {
  return `#${rHexAny(3)}`;
}
function rFull() {
  return `#${rHexAny(6)}`;
}

function rN(max = 200, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

window.onload = action;
