window.onload = main;

const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");

const heigt = canvv.height;
const withd = canvv.width;
const gravity = 0.8;
const accelerate = 4;
const friction = 0.5;
let scrollOffset = 0;
const MaxFallSpeed = 20;

class Player {
  constructor({ x = 0, y = 0, width = 50, height = 60, color = "#f0f" }) {
    this.pos = {};
    this.pos.x = x;
    this.pos.y = y;
    this.vel = { vx: 0, vy: 3 };
    this.width = width;
    this.height = height;
    this.color = color;
    this.isGrounded = false;
    this.isFacingRight = true;
  }

  DrawPlayer() {
    can.fillStyle = this.color;
    const px = this.pos.x;
    const py = this.pos.y;
    const pW = this.width;
    const Ph = this.height;
    can.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    // nose
    can.fillStyle = this.color;
    const noseX = this.isFacingRight ? px + 0.8 * pW : px - 0.3 * pW;
    can.fillRect(noseX, py + 0.3 * Ph, 0.5 * pW, 0.05 * Ph);
    //eye
    can.fillStyle = "#ffffff";
    const eyeX = this.isFacingRight ? px + 0.6 * pW : px + 0.1 * pW;
    can.fillRect(eyeX, py + 0.1 * Ph, 0.3 * pW, 0.3 * Ph);
    // pupil
    can.fillStyle = "#000000";
    const pupilX = this.isFacingRight ? px + 0.7 * pW : px + 0.2 * pW;
    can.fillRect(pupilX, py + 0.2 * Ph, 0.1 * pW, 0.1 * Ph);
    // left pipe
    can.fillStyle = "#000";
    const BlackPipeX = this.isFacingRight ? px + 0.0 * pW : px + 0.5 * pW;
    can.fillRect(BlackPipeX, py + 0.7 * Ph, 0.5 * pW, 0.3 * Ph);
    // right pipe
    can.fillStyle = "#a52a2a";
    const brownPipeX = this.isFacingRight ? px + 0.5 * pW : px + 0.0 * pW;
    can.fillRect(brownPipeX, py + 0.7 * Ph, 0.5 * pW, 0.3 * Ph);
  }

  update() {
    this.DrawPlayer();
    this.pos.x += this.vel.vx;
    this.pos.y += this.vel.vy;

    if (this.vel.vy <= MaxFallSpeed) {
      this.vel.vy += gravity;
    } else {
      this.vel.vy = MaxFallSpeed;
    }
    if (this.isGrounded && keysss.w.pressed) this.vel.vy = -15;
    if (this.vel.vy > 7 || this.vel.vy < -7) this.isGrounded = false;

    if (keysss.a.pressed) {
      this.vel.vx -= accelerate;
      this.isFacingRight = false;
    }
    if (keysss.d.pressed) {
      this.vel.vx += accelerate;
      this.isFacingRight = true;
    }
    this.vel.vx *= friction;

    platforms.forEach((Platform) => {
      if (
        this.pos.y + this.height <= Platform.posy &&
        this.pos.y + this.height + this.vel.vy >= Platform.posy &&
        this.pos.x + this.width >= Platform.posx &&
        this.pos.x <= Platform.posx + Platform.width
      ) {
        this.vel.vy = 0;
        setTimeout(() => (this.isGrounded = true), 80);
      }
    });
  }
}
class Platform {
  constructor({ posx, posy, width = 300, height = 30, color = "#888" }) {
    this.posx = posx;
    this.posy = posy;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  DrawPlatform() {
    can.fillStyle = this.color;
    can.fillRect(this.posx, this.posy, this.width, this.height);
    return this;
  }
}
const man = new Player({ x: 50, y: 50, width: 50, height: 80 });
const shade = new Player({ x: 500, y: 50, width: 50, height: 80,color : "#288" });

const platforms = [
  new Platform({
    posx: -50,
    posy: canvv.height - 30,
    height: 50,
    width: 3000,
    color: "#f79d34",
  }),
  new Platform({ posx: 200, posy: 200, width: 100, height: 15 }),
  new Platform({ posx: 300, posy: 100, width: 300, height: 15 }),
  new Platform({ posx: 200, posy: 60, width: 100, height: 15 }),
];
function main() {
  console.log("succes");
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  can.clearRect(0, 0, canvv.width, canvv.height);
  // draw platforms
  platforms.forEach((Platform) => {
    Platform.DrawPlatform();
  });
  man.update();
  shade.update();
  const MaxRightCor = 300;
  const MaxLeftCor = 30;
  // scroll properties detection
  if (man.pos.x <= MaxLeftCor || man.pos.x >= MaxRightCor) {
    platforms.forEach((Platform) => {
      Platform.posx -= man.vel.vx;
    });
    scrollOffset += man.vel.vx;
    if (man.pos.x <= MaxLeftCor) man.pos.x = MaxLeftCor;
    if (man.pos.x >= MaxRightCor) man.pos.x = MaxRightCor;
  }
  // off screen detection
  if (man.pos.y >= canvv.height) {
    man.pos.y = 0;
    man.pos.x = 120;
  }
}

setInterval(() => {
  console.table(keysss);
}, 5000);
const keysss = {
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
};

window.addEventListener("keydown", (ev) => {
  keyPress(ev.key.toLowerCase());
});
window.addEventListener("keyup", (ev) => {
  keyUP(ev.key.toLowerCase());
});
function keyPress(button) {
  switch (button) {
    case "a":
    case "arrowleft":
      keysss.a.pressed = true;
      break;
    case "s":
    case "arrowdown":
      keysss.s.pressed = true;
      break;
    case "d":
    case "arrowright":
      keysss.d.pressed = true;
      break;
    case "w":
    case "arrowup":
      keysss.w.pressed = true;
      break;
    default:
      // keysss[button.toLowerCase()] = {};
      // keysss[button.toLowerCase()].pressed = true;
      break;
  }
}

function keyUP(button) {
  switch (button) {
    case "a":
    case "arrowleft":
      keysss.a.pressed = false;
      break;
    case "s":
    case "arrowdown":
      keysss.s.pressed = false;
      break;
    case "d":
    case "arrowright":
      keysss.d.pressed = false;
      break;
    case "w":
    case "arrowup":
      keysss.w.pressed = false;
      break;
    default:
      // keysss[button.toLowerCase()].pressed = false;
      break;
  }
}
