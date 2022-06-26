window.onload = main;
const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const gravity = 0.3;

const orbs = [new Orb({}), new Orb({}), new Orb({}), new Orb({})];

const add = setInterval(() => {
  console.count("orb");
  orbs.push(new Orb({}));
}, 1000);
setTimeout(() => {
  console.log("no more");
  clearInterval(add);
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
  art.clearRect(0, 0, width, height);
  art.lineWidth = 3;
  orbs.forEach((objectt) => {
    objectt.update();
  });
  cubes.forEach((objectt) => {
    objectt.update();
  });
  // cancelAnimationFrame(900);
}
