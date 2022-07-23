window.onload = main;

const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");
const middleX = canvas.width / 2;
const middleY = canvas.height / 2;
const planetRadius = 100;

class Planet {
  constructor({}) {
    this.px = middleX;
    this.py = middleY;
    this.radius = 100;
    this.color = random.rFull();
    this.gravity = 3;
    this.maxFallSpeed = 10;
    this.accelete = 0.7;
  }
  Draw() {
    drawCircle(this.px, this.py, this.radius, this.color);
    return;
  }
}

class Player {
  constructor({ width = 40 }) {
    this.px = random.range(canvas.width);
    this.py = random.range(canvas.height);
    this.width = width;
    this.height = this.width * 3;
    this.rad = this.width * 0.5;
    this.speed = 3;
    this.gravitySpeed = 0;
    this.vx = 2;
    this.vy = 2;
    this.leftPress = false;
    this.rightPress = false;
    this.upPress = false;
    this.vectorSpeed = this.speed;
    this.color = random.rFull();
    this.isGrounded = false;
  }

  Draw() {
    art.fillStyle = "#222";
    const dx = this.px - aarde.px;
    const dy = this.py - aarde.py;

    const to1length = 1 / Math.hypot(dx, dy);
    const b = dx * to1length * this.width;
    const n = dy * to1length * this.width;

    const nx = dx * to1length;
    const ny = dy * to1length;
    //drawCircle(this.px, this.py, this.height * 0.5, this.color);
    const tempx = this.px - ny * 0.5 * this.width;
    const tempy = this.py + nx * 0.5 * this.width;

    const upLx = tempx - nx * 0.5 * this.height;
    const upLy = tempy - ny * 0.5 * this.height;
    const upRx = upLx + ny * this.width;
    const upRy = upLy - nx * this.width;

    const lowLx = tempx + nx * 0.5*this.height;
    const lowLy = tempy + ny * 0.5*this.height;
    const lowRx = lowLx + ny * this.width;
    const lowRy = lowLy - nx * this.width;
    art.beginPath();
    art.lineTo(upLx, upLy);
    art.lineTo(upRx, upRy);
    art.lineTo(lowRx, lowRy);
    art.lineTo(lowLx, lowLy);
    art.lineTo(upLx, upLy);
    art.fill();
    // art.stroke();
    art.closePath();

    drawCircle(this.px + b, this.py + n, this.rad, "#0ff");
    drawCircle(this.px + 0, this.py + 0, this.rad);
    drawCircle(this.px - b, this.py - n, this.rad, "#f0f");
  }
  update() {
    const dx = this.px - aarde.px;
    const dy = this.py - aarde.py;

    const to1length = 1 / Math.hypot(dx, dy);
    this.vectorSpeed = to1length;
    this.vy = dy * to1length;
    this.vx = dx * to1length;
    this.gravitySpeed += aarde.accelete;
    if (this.gravitySpeed >= aarde.maxFallSpeed)
      this.gravitySpeed = aarde.maxFallSpeed;

    if (this.leftPress) {
      mario.px -= mario.vy * mario.speed;
      mario.py += mario.vx * mario.speed;
    }
    if (this.rightPress) {
      mario.px += mario.vy * mario.speed;
      mario.py -= mario.vx * mario.speed;
    }
    if (this.upPress) {
      this.Jump();
    }
    const orgX = this.px;
    const orgY = this.py;
    this.px += this.vx * -this.gravitySpeed;
    this.py += this.vy * -this.gravitySpeed;
    const NEWdx = this.px - aarde.px;
    const NEWdy = this.py - aarde.py;
    if (Math.hypot(NEWdx, NEWdy) <= aarde.radius + this.height * 0.5) {
      this.px = orgX;
      this.py = orgY;
      this.isGrounded = true;
      this.gravitySpeed = 1;
    }
    this.Draw();
  }
  Jump() {
    if (this.isGrounded) {
      this.gravitySpeed = -20;
      this.isGrounded = false;
      this.update();
      return this;
    }
    return this;
  }
}
const mario = new Player({});
const aarde = new Planet({});

function main() {
  console.log("import");
  animate();
}

function animate() {
  //console.count(`animate ${Math.floor(Date.now() / 1000)}`);
  art.clearRect(0, 0, canvas.width, canvas.height);
  aarde.Draw();
  mario.update();
  requestAnimationFrame(animate);
}

function drawCircle(x, y, radius, color = "#888") {
  art.fillStyle = color;
  art.beginPath();
  art.arc(x, y, radius, 0, 2 * Math.PI);
  art.fill();
  art.closePath();
  return;
}

window.addEventListener("keydown", (ev) => {
  movement(ev.key);
});

let left = NaN;
let right = NaN;
let up = NaN;

function movement(key) {
  // console.count(`keyPress ${Math.floor(Date.now() / 1000)}`);
  switch (key) {
    case "a":
    case "A":
    case "ArrowLeft":
      mario.leftPress = true;
      clearTimeout(left);
      left = setTimeout(() => {
        mario.leftPress = false;
        return;
      }, 100);
      break;
    case "d":
    case "D":
    case "ArrowRight":
      mario.rightPress = true;
      clearTimeout(right);
      right = setTimeout(() => {
        mario.rightPress = false;
        return;
      }, 100);
      break;
    case "w":
    case "W":
    case "ArrowUp":
      mario.upPress = true;
      clearTimeout(up);
      up = setTimeout(() => {
        mario.upPress = false;
        return;
      }, 100);
      break;
    default:
      break;
  }
}
