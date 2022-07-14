window.onload = main;

const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");
console.log(art);

const middleX = canvas.width * 0.5;
const middleY = canvas.height * 0.5;
const trackRadius = 250;


class Driver {
  constructor({}) {
    this.trackPos = 0;
    this.speed = 0.001 + (Math.random()+1) / 200;
    this.radius = 10;
    this.color = random.rFull();
  }

  Draw() {
    art.fillStyle = this.color;
    const x = middleX + trackRadius * Math.cos(this.trackPos);
    const y = middleY + trackRadius * Math.sin(this.trackPos);
    art.beginPath();
    art.arc(x, y, this.radius, 0, Math.PI * 2);
    art.fill();
    art.closePath();
  }
  update() {
    this.trackPos += this.speed;
    this.Draw();
  }
}

function main() {
  console.log("index imported");
  art.lineWidth = 20;
  animate();
}

const pack = [
  new Driver({}),
  new Driver({}),
  new Driver({}),
  new Driver({}),
  new Driver({}),
  new Driver({}),
  new Driver({}),
  new Driver({}),
  new Driver({}),
];
function animate() {
  requestAnimationFrame(animate);
  art.clearRect(0, 0, canvas.width, canvas.height);
  theTrack();
  pack.forEach((driv) => {
    driv.update();
  });

}

function theTrack() {
  art.lineWidth = 20;
  art.beginPath();
  art.arc(middleX, middleY, trackRadius, 0, Math.PI * 2);
  art.stroke();
  art.closePath();
}
