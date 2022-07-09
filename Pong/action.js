window.onload = main;
const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const MainOrb = new Orb({ radius: 60 });
const LeftShield = new Shield({ x: 50, y: 200 });
const RightShield = new Shield({ x: 800 - 50 - 30, y: 200 });

const Schilden = [LeftShield,RightShield];

function main() {
  console.log("action imported");
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  art.clearRect(0, 0, width, height);

  MainOrb.update();
  Schilden.forEach(element => {
    element.Draw()
  });
  //LeftShield.Draw();
  //RightShield.Draw();

  // cancelAnimationFrame(900);
}

window.addEventListener("keydown", (ev) => {
  console.log(ev.key.toLowerCase());
  input(ev.key.toLowerCase());
});

function input(number) {
  switch (number) {
    case "arrowdown":
    case "s":
      LeftShield.pos.y += 20;
      RightShield.pos.y += 20;
      break;
    case "arrowup":
    case "w":
      LeftShield.pos.y -= 20;
      RightShield.pos.y -= 20;
      break;
    default:
      break;
  }
}
