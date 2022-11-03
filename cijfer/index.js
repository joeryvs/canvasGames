const gokkans = document.querySelector("#gokkans");
const points = document.querySelector("#points");
const maxPoints = document.querySelector("#maxPoints");
const hallmark = document.querySelector("#hallmark");

// console.log(gokkans);
// console.log(gokkans,points,maxPoints,hallmark);
let mp, currentpoint, theHallMark, geusscorrect;
console.debug(gokkans);
console.info(hallmark);

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

console.log(canvv2);

// const art = canvas.getContext("2d");
canExtra.textAlign = "center";
canExtra.font = "100px sans-serif";
console.log(maxPoints);
function Draw() {
  requestAnimationFrame(Draw);
  const pop = canvv1.getContext("2d");
  pop.beginPath();

  pop.closePath();
  // art.fillRect(40,40,300,300);
  mp = Number(maxPoints.value);
  geusscorrect = Number(gokkans.value);
  currentpoint = Number(points.value);
  theHallMark = Number(hallmark.value);
  let b = cijfer(currentpoint, mp, geusscorrect, theHallMark);
canExtra.clearRect(0,0,canvv1.width,canvv1.height)
  canExtra.fillText(b, 200, 200, 400);
}

function main() {
  console.log("succes");
  Draw();
  return;
}

