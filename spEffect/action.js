window.onload = main;
const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const gravity = 0.3;

const orbs = [new Orb({}), new Orb({}), new Orb({}), new Orb({})];

const addOrb = setInterval(() => {
  console.count("orb");
  orbs.push(new Orb({}));
}, 1000);
setTimeout(() => {
  console.log("no more");
  clearInterval(addOrb);
}, 60 * 1000);

const cubes = [new Cube({}), new Cube({}), new Cube({}), new Cube({})];

const addCube = setInterval(() => {
  console.count("cube");
  cubes.push(new Cube({ width: 40, height: 40 }));
}, 1000);
setTimeout(() => {
  console.log("no more");
  clearInterval(addCube);
}, 60 * 1000);

function main() {
  console.log("action imported");
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  art.fillStyle = "#ffffff10";
  art.fillRect(0,0,canvas.width,canvas.height);
  // art.clearRect(0, 0, width, height);
  // art.lineWidth = 3;
  orbs.forEach((objectt) => {
    objectt.update();
  });
  cubes.forEach((objectt) => {
    objectt.update();
  });
  // cancelAnimationFrame(900);
}

// neverCalled
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
