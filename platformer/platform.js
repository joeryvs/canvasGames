window.onload = main;

const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");

const heigt = canvv.height;
const withd = canvv.width;
const gravity = 0.5;
const accelerate = 4;
const friction = 0.5;

class Player {
  constructor({ pos = { x: 0, y: 0 }, width = 50, height = 60 }) {
    this.pos = pos;
    this.vel = { vx: 0, vy: 1 };
    this.width = width;
    this.height = height;
    this.color = "#f0f";
    this.isGrounded = false;
  }

  DrawPlayer() {
    can.fillStyle = this.color;
    can.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  update() {
    this.DrawPlayer();
    this.pos.x += this.vel.vx;
    this.pos.y += this.vel.vy;
    this.vel.vy += gravity;
    if (keysss.a.pressed) {
      man.vel.vx -= accelerate;
    }
    if (keysss.d.pressed) {
      man.vel.vx += accelerate;
    }
    this.vel.vx *= friction;
    if (this.pos.y + this.height >= canvv.height) {
      this.pos.y = canvv.height - this.height;
      this.vel.vy = 0;
      this.isGrounded = true;
    }
  }
}
class Platform {
  constructor({ posx, posy, width = 300, height = 30 }) {
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
    this.color = "#888";
  }

  DrawPlatform() {
    can.fillStyle = this.color;
    can.fillRect(this.posx, this.posy, this.width, this.height);
    return this;
  }
}
const man = new Player({ pos: { x: 50, y: 10 }, width: 50, height: 70 });
const ppp1 = new Platform({ posx: 200, posy: 200 });
function main() {
  console.log("succes");
  animate();
}

function animate() {
    requestAnimationFrame(animate);
  can.clearRect(0, 0, canvv.width, canvv.height);
  man.update();
  ppp1.DrawPlatform();
  if (man.pos.y + man.height <= ppp1.posx) {
    man.vel.vy = 0;
  }
}

setInterval(() => {
  console.log(keysss);
}, 5000);
const keysss = {
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  q: { pressed: false },
};

window.addEventListener("keypress", (ev) => {
  keyPress(ev.key);
});
window.addEventListener("keyup", (ev) => {
  keyUP(ev.key);
});
function keyPress(button) {
  switch (button) {
    case "a":
    case "A":
      keysss.a.pressed = true;

      break;
    case "s":
    case "S":
      keysss.s.pressed = true;
      break;
    case "d":
    case "D":
      keysss.d.pressed = true;

      break;
    case "w":
    case "W":
      if (man.isGrounded) {
        man.isGrounded = false;
        man.vel.vy = -10;
      }
      keysss.w.pressed = true;
      break;
    default:
      break;
  }
}

function keyUP(button) {
  switch (button) {
    case "a":
    case "A":
      keysss.a.pressed = false;
      break;
    case "s":
    case "S":
      keysss.s.pressed = false;
      break;
    case "d":
    case "D":
      keysss.d.pressed = false;
      break;
    case "w":
    case "W":
      keysss.w.pressed = false;
      break;
    default:
      break;
  }
}
