window.onload = main;

const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");
const sx = 30;
const sy = 20;
const heigt = canvv.height;
const withd = canvv.width;

const blockX = withd / sx;
const blockY = heigt / sy;

class Apple {
  constructor() {
    this.pos = {
      x: Math.floor(Math.random() * sx),
      y: Math.floor(Math.random() * sy),
    };
    this.color = "red";
    this.width = blockX;
    this.height = blockY;
  }
  newPos() {
    this.pos.x = Math.floor(Math.random() * sx);
    this.pos.y = Math.floor(Math.random() * sy);
  }

  drawApple() {
    can.fillStyle = this.color;
    can.fillRect(
      this.pos.x * blockX,
      this.pos.y * blockY,
      this.width,
      this.height
    );
  }
}

class snake {
  constructor({
    pos = { px: 10, py: 10 },
    headColor = "#0f0",
    tailColor = "#099",
  }) {
    this.pos = pos;
    this.velocety = { vx: 1, vy: 0 };
    this.headColor = headColor;
    this.tailColor = tailColor;
    this.objectLengt = 5;
    this.trail = [];
    this.width = blockX;
    this.height = blockY;
  }
  posUpdate() {
    this.pos.px += this.velocety.vx;
    this.pos.py += this.velocety.vy;
    if (this.pos.px >= sx) this.pos.px = 0;
    if (this.pos.px < 0) this.pos.px = sx - 1;
    if (this.pos.py >= sy) this.pos.py = 0;
    if (this.pos.py < 0) this.pos.py = sy - 1;
    return this;
  }

  AppleCheck() {
    if (this.pos.px === appel.pos.x && this.pos.py === appel.pos.y) {
      this.objectLengt += 1;
      scoreUpdate();
      appel.newPos();
    }
  }

  trailUpdate() {
    const Curr = { px: this.pos.px, py: this.pos.py };
    this.trail.push(Curr);
    if (this.trail.length > this.objectLengt) {
      this.trail = this.trail.slice(-this.objectLengt);
    }
  }

  drawHead() {
    can.fillStyle = this.headColor;
    can.fillRect(
      this.width * this.pos.px,
      this.height * this.pos.py,
      this.width,
      this.height
    );
  }

  drawTail(sp = 3) {
    can.fillStyle = this.tailColor;
    for (let i = 0; i < this.trail.length; i++) {
      const element = this.trail[i];
      const tailXcor = element.px;
      const tailYcor = element.py;
      can.fillStyle = this.tailColor;
      can.fillRect(
        blockX * tailXcor,
        blockY * tailYcor,
        this.width,
        this.height
      );
      can.fillStyle = "#00000055";
      can.fillRect(
        this.width * tailXcor + sp,
        this.height * tailYcor + sp,
        this.width - 2 * sp,
        this.height - 2 * sp
      );
      if (
        this.pos.px === tailXcor &&
        this.pos.py === tailYcor &&
        this.collisionCheck
      ) {
        console.log(this.pos, element);
        console.log(this.pos == element, this.pos === element);
        this.objectLengt = 5;
        scoreUpdate();
      }
    }
  }
  snakeDraw() {
    this.posUpdate();
    this.drawTail();
    this.drawHead();
    this.AppleCheck();
    this.trailUpdate();
    return this;
  }
}
const ssnake = new snake({
  pos: { px: 10, py: 10 },
  headColor: "#0ff",
  tailColor: "#592",
});

const appel = new Apple();
appel.newPos();
appel.newPos();

function main() {
  console.log("succes");
  Draw();
  addEventListener("keydown", (test) => {
    KeyPress(test.key);
  });
  return;
}

function Draw() {
  setTimeout(Draw, 180);
  // requestAnimationFrame(Draw);
  can.clearRect(0, 0, canvv.width, canvv.height);

  ssnake.snakeDraw();
  appel.drawApple();
  return;
}
// function blockDraw(corX, corY) {
//   can.fillRect(blockX * corX, blockY * corY, blockX, blockY);
// }

function scoreUpdate() {
  const score = document.querySelector("p#len");
  score.innerHTML = ssnake.objectLengt.toString();
}

function KeyPress(inp) {
  console.count(inp);
  switch (inp) {
    case "a":
    case "A":
    case "ArrowLeft":
      ssnake.velocety = { vx: -1, vy: 0 };
      break;
    case "S":
    case "s":
    case "ArrowDown":
      ssnake.velocety = { vx: 0, vy: 1 };
      break;
    case "d":
    case "D":
    case "ArrowRight":
      ssnake.velocety = { vx: 1, vy: 0 };
      break;
    case "w":
    case "W":
    case "ArrowUp":
      ssnake.velocety = { vx: 0, vy: -1 };
      break;
    default:
      break;
  }
}
