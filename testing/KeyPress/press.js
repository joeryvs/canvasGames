console.log("succes");

const keys = {};
setInterval(() => {
  console.table(keys);
}, 2000);

window.addEventListener("keydown", (ev) => {
  keyDown(ev.key.toLowerCase());
});
window.addEventListener("keyup", (ev) => {
  keyUp(ev.key.toLowerCase());
});

function keyDown(burron) {
  try {
    console.log(burron);
    low = burron.toLowerCase();
    keys[low] = {};
    keys[low].pressed = true;
    const temp = document.getElementById(low);
    temp.style.color = "#ff0000";
    temp.style.display = "block"
  } catch (error) {
    // console.log(error);
  }
}

function keyUp(burron) {
  try {
    console.log(burron);
    const low = burron.toLowerCase();
    keys[low].pressed = false;
    document.getElementById(low).style.color = "#00ff00";
  } catch (error) {}
}
