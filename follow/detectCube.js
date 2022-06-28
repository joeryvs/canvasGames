window.onload = main;
const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");
canvasResize();
const gravity = 0.3;

class Orb {
  constructor({ radius, x, y }) {
    this.radius = radius === undefined ? random.rN(30, 75) : radius;
    this.width = 2 * this.radius;
    this.height = 2 * this.radius;
    this.pos = {
      x:
        x === undefined
          ? random.rN(canvas.width - this.radius, this.radius)
          : x,
      y:
        y === undefined
          ? random.rN(canvas.height - this.radius, this.radius)
          : y,
    };
    this.vel = { x: random.PosOrMinusRange(5), y: random.PosOrMinusRange(2) };
    this.trueColor = random.rFull();
    this.color = this.trueColor;
  }

  Draw() {
    art.strokeStyle = "#000";
    art.fillStyle = this.color;
    art.beginPath();
    art.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    art.fill();
    art.stroke();
    art.closePath();
    return this;
  }
  update() {
    this.Draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.y += gravity;
    if (this.pos.y + this.radius >= canvas.height) this.vel.y *= -1;

    if (this.pos.x + this.radius >= canvas.width || this.pos.x <= this.radius)
      this.vel.x *= -1;
  }
  type() {
    return Orb;
  }
}

class Cube {
  constructor({ width, height, x, y }) {
    this.width = width === undefined ? random.rN(60, 150) : width;
    this.height = height === undefined ? random.rN(80, 180) : height;
    this.pos = {
      x: x === undefined ? random.rN(0, canvas.width - this.width) : x,
      y: y === undefined ? random.rN(0, canvas.height - this.height) : y,
    };
    this.vel = { x: random.PosOrMinusRange(5), y: random.PosOrMinusRange(2) };
    this.trueColor = random.rFull();
    this.color = this.trueColor;
  }

  Draw() {
    art.fillStyle = this.color;
    art.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    return this;
  }
  update() {
    this.Draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.y += gravity;
    if (this.pos.y + this.height >= canvas.height) this.vel.y *= -1;

    if (this.pos.x + this.width >= canvas.width || this.pos.x <= 0)
      this.vel.x *= -1;
  }
  type() {
    return Cube;
  }
}

function main() {
  animate();
}

const moveble = random.randomBool() ? new Orb({}) : new Cube({});
// const moveble = new Orb({ radius: 50 });
const unmoveble = random.randomBool() ? new Orb({}) : new Cube({});

canvas.addEventListener("dblclick", ()=> {canvas.classList.toggle("noCursor")})
canvas.addEventListener("mousemove", ({ offsetX, offsetY }) => {
  Mousemove(offsetX, offsetY);
});

function Mousemove(ofX, ofY) {
  if (moveble.type() == Cube) {
    moveble.pos.x = ofX - 0.5 * moveble.width;
    moveble.pos.y = ofY - 0.5 * moveble.height;
  } else if (moveble.type() == Orb) {
    moveble.pos.x = ofX;
    moveble.pos.y = ofY;
  }
  setTimeout(() => {
    if (unmoveble.type() == Cube) {
      unmoveble.pos.x = ofX - 0.5 * unmoveble.width;
      unmoveble.pos.y = ofY - 0.5 * unmoveble.height;
    } else if (unmoveble.type() == Orb) {
      unmoveble.pos.x = ofX;
      unmoveble.pos.y = ofY;
    }
    
  }, 700);
}



function animate() {
  requestAnimationFrame(animate);
  canvasResize();
  art.clearRect(0, 0, canvas.width, canvas.height);
  unmoveble.Draw();
  moveble.Draw();
  if (isTouchingObject({ Orb1: moveble, cirkle: unmoveble })) {
    moveble.color = moveble.trueColor + "55";
    unmoveble.color = unmoveble.trueColor + "55";
  } else {
    moveble.color = moveble.trueColor;
    unmoveble.color = unmoveble.trueColor;
  }
  //   cancelAnimationFrame(900);
}

function canvasResize() {
  canvas.width = window.innerWidth - 100;
  canvas.height = window.innerHeight - 150;
}

// unused
function isTouchingCubes({ cube1 = moveble, cube2 = unmoveble }) {
  if (cube1.type() === Cube && cube2.type() === Cube) {
    return (
      cube1.pos.x + cube1.width >= cube2.pos.x &&
      cube1.pos.x <= cube2.pos.x + cube2.width &&
      cube1.pos.y + cube1.height >= cube2.pos.y &&
      cube1.pos.y <= cube2.pos.y + cube2.height
    );
  }
}

// unused
function isTouchingOrbs({ Orb1 = moveble, cirkle = unmoveble }) {
  if (Orb1.type() === Orb && cirkle.type() === Orb) {
    const DX = Orb1.pos.x - cirkle.pos.x;
    const DY = Orb1.pos.y - cirkle.pos.y;
    return Math.hypot(DX, DY) <= Orb1.radius + cirkle.radius;
  }
}

function isTouchingObject({ ojbect1 = moveble, ssss2 = unmoveble }) {
  if (ojbect1.type() === Orb && ssss2.type() === Orb) {
    const DX = ojbect1.pos.x - ssss2.pos.x;
    const DY = ojbect1.pos.y - ssss2.pos.y;
    return Math.hypot(DX, DY) <= ojbect1.radius + ssss2.radius;
  } else if (ojbect1.type() === Cube && ssss2.type() === Cube) {
    return (
      ojbect1.pos.x + ojbect1.width >= ssss2.pos.x &&
      ojbect1.pos.x <= ssss2.pos.x + ssss2.width &&
      ojbect1.pos.y + ojbect1.height >= ssss2.pos.y &&
      ojbect1.pos.y <= ssss2.pos.y + ssss2.height
    );
  } else if (ojbect1.type() === Orb && ssss2.type() === Cube) {
    const hor =
      ssss2.pos.x <= ojbect1.pos.x + ojbect1.radius &&
      ssss2.pos.x + ssss2.width >= ojbect1.pos.x - ojbect1.radius &&
      ssss2.pos.y <= ojbect1.pos.y &&
      ssss2.pos.y + ssss2.height >= ojbect1.pos.y;
    const ver =
      ssss2.pos.y <= ojbect1.pos.y + ojbect1.radius &&
      ssss2.pos.y + ssss2.height >= ojbect1.pos.y - ojbect1.radius &&
      ssss2.pos.x <= ojbect1.pos.x &&
      ssss2.pos.x + ssss2.width >= ojbect1.pos.x;
    // horizontal and vertical plane
    if (hor || ver) return true;
    const rxDX = ssss2.pos.x + ssss2.width - ojbect1.pos.x;
    const lyDY = ssss2.pos.y + ssss2.height - ojbect1.pos.y;
    const lxDX = ssss2.pos.x - ojbect1.pos.x;
    const uyDY = ssss2.pos.y - ojbect1.pos.y;
    return (
      // lower right corner of the cube
      Math.hypot(rxDX, lyDY) <= ojbect1.radius ||
      // lower left corner of the cube
      Math.hypot(lxDX, lyDY) <= ojbect1.radius ||
      // upper right corner of the cube
      Math.hypot(rxDX, uyDY) <= ojbect1.radius ||
      // upper left corner of the cube
      Math.hypot(lxDX, uyDY) <= ojbect1.radius
    );
  } else if (ojbect1.type() === Cube && ssss2.type() === Orb) {
    const hor =
      ojbect1.pos.x <= ssss2.pos.x + ssss2.radius &&
      ojbect1.pos.x + ojbect1.width >= ssss2.pos.x - ssss2.radius &&
      ojbect1.pos.y <= ssss2.pos.y &&
      ojbect1.pos.y + ojbect1.height >= ssss2.pos.y;
    const ver =
      ojbect1.pos.y <= ssss2.pos.y + ssss2.radius &&
      ojbect1.pos.y + ojbect1.height >= ssss2.pos.y - ssss2.radius &&
      ojbect1.pos.x <= ssss2.pos.x &&
      ojbect1.pos.x + ojbect1.width >= ssss2.pos.x;
    // horizontal and vertical plane
    if (hor || ver) return true;
    const rxDX = ojbect1.pos.x + ojbect1.width - ssss2.pos.x;
    const lyDY = ojbect1.pos.y + ojbect1.height - ssss2.pos.y;
    const lxDX = ojbect1.pos.x - ssss2.pos.x;
    const uyDY = ojbect1.pos.y - ssss2.pos.y;
    return (
      // lower right corner of the cube
      Math.hypot(rxDX, lyDY) <= ssss2.radius ||
      // lower left corner of the cube
      Math.hypot(lxDX, lyDY) <= ssss2.radius ||
      // upper right corner of the cube
      Math.hypot(rxDX, uyDY) <= ssss2.radius ||
      // upper left corner of the cube
      Math.hypot(lxDX, uyDY) <= ssss2.radius
    );
  } else {
    return false;
  }
}
