window.onload = main;

const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");
let dir = 0;
const middleX = canvas.width * 0.5;
const middleY = canvas.height * 0.5;
const img = new Image(500,100);
img.src = "../mario-hat.png"

console.log(img);


const imggg = document.querySelector("img")
console.log(imggg);
function main() {
  console.log("spin imported");
  Draw();
}

function Draw() {
  requestAnimationFrame(Draw);
  art.clearRect(-1000, -1000, 2000, 2000);
  //specialrotate();
  art.drawImage(img,0,0)
 // art.rotate(0.01);
  console.log(canvas.toDataURL("png"))
}
function specialrotate() {
  art.fillRect(200, 200, 200, 200);
  art.fillStyle = random.rShort();
  art.fillRect(-400, 200, 200, 200);
  art.fillStyle = random.rShort();
  art.fillRect(-400, -400, 200, 200);
  art.fillStyle = random.rShort();
  art.fillRect(200, -400, 200, 200);
}

