window.onload = main;

const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");

const gravity = 0.5;
let scrollOffset = 0;
const MaxFallSpeed = 20;

class Bird {
  constructor({ x = 0, y = 0, radius }) {
    this.pos = {};
    this.pos.x = x;
    this.pos.y = y;
    this.vel = { vx: 4, vy: 3 };
    this.radius = radius;
    this.width = 2 * this.radius;
    this.height = 2 * this.radius;
    this.color = "#f0f";
  }

  DrawPlayer() {
    can.fillStyle = this.color;
    can.strokeStyle = "#000";
    can.lineWidth = 4;
    const px = this.pos.x;
    const py = this.pos.y;
    const pW = this.width;
    const Ph = this.height;
    can.beginPath();
    can.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    can.fill();
    can.closePath();
    can.fillStyle = "#00f";
    can.beginPath();
    can.arc(
      this.pos.x + 0.3 * this.width,
      this.pos.y - 0.2 * this.height,
      this.radius * 0.2,
      0,
      Math.PI * 2
    );
    can.fill();
    can.stroke();
    can.closePath();
  }

  update() {
    this.DrawPlayer();
    this.pos.x += this.vel.vx;
    this.pos.y += this.vel.vy;

    if (this.vel.vy <= MaxFallSpeed) this.vel.vy += gravity;
    else this.vel.vy = MaxFallSpeed;

    // if (man.isGrounded && keysss.w.pressed) man.vel.vy = -15;
    // if (this.vel.vy > 7 || this.vel.vy < -7) this.isGrounded = false;

    thePipes.forEach((pipepair) => {
      if (
        this.pos.x + this.radius >= pipepair.posx &&
        this.pos.x - this.radius <= pipepair.posx
      ) {
        if (
          this.pos.y + this.radius >= pipepair.Lowerposy ||
          this.pos.y - this.radius <= pipepair.Lowerposy - pipepair.gap
        ) {
          this.vel.vy = 0;
          this.vel.vx = 0;
        }
      }
    });
  }
}
class PipesPairs {
  constructor({
    posx,
    posy,
    width = 30,
    height = 3000,
    color = "#8f8",
    gap = 250,
  }) {
    this.posx = posx;
    this.Lowerposy = posy;
    this.width = width;
    this.height = height;
    this.color = color;
    this.gap = gap;
  }

  DrawPlatform() {
    can.fillStyle = this.color;
    can.fillRect(this.posx, this.Lowerposy, this.width, this.height);
    can.fillRect(
      this.posx,
      this.Lowerposy - this.gap - this.height,
      this.width,
      this.height
    );
    return this;
  }
}
const man = new Bird({ pos: { x: 50, y: 50 }, radius: 25 });

const thePipes = [
  // new PipesPairs({ posx: 200, posy: 00 }),
  // new PipesPairs({ posx: 500, posy: 100 }),
  new PipesPairs({ posx: 800, posy: 200 }),
  new PipesPairs({ posx: 1200, posy: 300 }),
  new PipesPairs({ posx: 1500, posy: 400 }),
  new PipesPairs({ posx: 2000, posy: 400 }),
  new PipesPairs({ posx: 2500, posy: 400 }),
  new PipesPairs({ posx: 2600, posy: 400 }),
  // new PipesPairs({ posx: 1800, posy: 500 }),
  // new PipesPairs({ posx: 2100, posy: 600 }),
];
function main() {
  console.log("succes");
  animate();
}

function animate() {
  let end = requestAnimationFrame(animate);
  canvv.height = 500;
  canvv.width = window.innerWidth - 100;
  can.clearRect(0, 0, canvv.width, canvv.height);
  // draw platforms
  thePipes.forEach((Platform) => {
    Platform.DrawPlatform();
  });
  man.update();

  const MaxRightCor = canvv.width / 3;
  // scroll properties detection
  if (man.pos.x >= MaxRightCor) {
    thePipes.forEach((Platform) => {
      Platform.posx -= man.vel.vx;
    });
    scrollOffset += man.vel.vx;
    if (man.pos.x >= MaxRightCor) man.pos.x = MaxRightCor;
  }
  // off screen detection
  if (man.pos.y >= canvv.height) {
    man.pos.y = canvv.height - man.radius;
    // man.pos.x = 120;
    TextDisplay(end, "you hit the floor");
  }
  if (man.pos.y + 3 * man.radius <= 0) {
    man.pos.y = 100;
    man.pos.x = 120;
    TextDisplay(end, "you hit the ceiling");
  }

  if (scrollOffset > 9000) {
    TextDisplay(end, "you win");
  }
}

function TextDisplay(endNum, text) {
  cancelAnimationFrame(endNum);
  can.font = "80px sans-serif";
  can.textAlign = "center";
  can.strokeText(text, canvv.width * 0.5, canvv.height * 0.5);
}

window.addEventListener("keypress", jump);
canvv.addEventListener("click", jump);

function jump() {
  if (man.vel.vy > -6) {
    man.vel.vy = -10;
  } else {
    console.log("illigal input");
  }
}
