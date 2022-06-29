window.onload = main;

const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");
const sx = 120;
const sy = 80;
const heigt = canvv.height;
const withd = canvv.width;

const blockX = withd / sx;
const blockY = heigt / sy;

const colour = document.getElementById("test");
console.log(colour);
colour.value = random.rFull()
const nums = document.getElementsByName("nums");
console.log(nums);

const ran = document.getElementById("range");
console.log(ran);

let count = 0;
function main() {
  console.log("succes");
  Draw();
  return;
}

function Draw() {
  setTimeout(Draw, 300);
  canvv.height = nums[1].value;
  canvv.width = nums[0].value;
  can.clearRect(0, 0, canvv.width, canvv.height);

  count++;

  const val3 = Math.floor((ran.value * 255) / 100).toString(16).padStart(2, "0");
  const x = colour.value + val3;
  can.fillStyle = x;
  can.fillRect(40, 40, canvv.width - 80, canvv.height - 80);
  scoreUpdate(count);
  return;
}

function blockDraw(corX, corY) {
  can.fillRect(blockX * corX, blockY * corY, blockX, blockY);
}

function scoreUpdate(input) {
  const score = document.querySelector("p#len");
  score.innerHTML = input.toString() + "   generations";
}
