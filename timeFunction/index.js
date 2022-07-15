window.onload = main;

const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");
console.log(art);

const middleX = canvas.width * 0.5;
const middleY = canvas.height * 0.5;
const trackRadius = 250;

class Dot {
  constructor({}) {
    this.radius = 2;
    this.color = random.rFull();
    this.xCor = 1;
    this.yCor = 1;
    this.time = 0;
    this.timeAdvance = 0.03;
  }

  Draw() {
    art.fillStyle = this.color;
    this.detemineCordinates();
    const px = this.xCor * 50 + middleX;
    const py = -this.yCor * 50 + middleY;
    art.beginPath();
    art.arc(px, py, this.radius, 0, Math.PI * 2);
    art.fill();
    art.closePath();
  }
  update() {
    this.time += this.timeAdvance;
    if (this.time > 20) this.time = -20;

    this.Draw();
  }

  detemineCordinates() {
    this.xCor = this.determineX();
    this.yCor = this.determineUpperY();
    return;
  }

  determineUpperY() {
    return Math.sin(this.time);
  }
  determineX() {
    return this.time
    return Math.cos(this.time);
  }
}

function main() {
  console.log("index imported");
  art.lineWidth = 20;
  animate();
}

const pack = [new Dot({ upper: true }), new Dot({ upper: false })];
const CoolDot = new Dot({});

function animate() {
  requestAnimationFrame(animate);
  CoolDot.update();
  CoolDot.update();
  CoolDot.update();
  // pack.forEach((driv) => driv.update());
}

function theTrack() {
  art.lineWidth = 20;
  art.beginPath();
  art.arc(middleX, middleY, trackRadius, 0, Math.PI * 2);
  art.stroke();
  art.closePath();
}
