window.onload = main;

const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");
const sx = 120;
const sy = 80;
const heigt = canvv.height;
const withd = canvv.width;
const col = document.getElementById("test")
const blockX = withd / sx;
const blockY = heigt / sy;


const conWay = new Generation(sx,sy);
const colours = colors(100);
let count = 0;
function main() {
  console.log("succes");
  conWay.ToNewArena();
  setTimeout(Draw, 200);
  return;
}

function Draw() {
  setTimeout(Draw, 200);

  can.clearRect(0, 0, canvv.width, canvv.height);
  count++
  can.fillStyle = col.value;
  // can.fillStyle = colours[count%colours.length];
  conWay.NextGen().artLife();
  scoreUpdate(count)
  return;
}

function blockDraw(corX, corY) {
  can.fillRect(blockX * corX, blockY * corY, blockX, blockY);
}

function scoreUpdate(input) {
  const score = document.querySelector("p#len");
  score.innerHTML = input.toString() + "   generations";
}


function colors(amount) {
  let co = []
  for (let x = 0; x < amount; x++) {
    co.push(random.rFull())    
  }
  return co
}