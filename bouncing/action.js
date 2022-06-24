window.onload = main;
const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;
const gravity = 0.3;



const cubes = [new Cube(), new Cube(), new Cube(), new Cube()];

const add = setInterval(() => {
  console.count("cube");
  cubes.push(new Cube());
}, 1000);
setTimeout(() => {
  console.log("no more");
  clearInterval(add);
}, 60 * 1000);
function main() {
  console.log("action imported");
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  art.clearRect(0, 0, width, height);

  cubes.forEach((cube) => {
    cube.update();
  });
  cancelAnimationFrame(4000)
}
