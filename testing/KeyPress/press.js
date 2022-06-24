console.log("succes");

const keys = {};
setInterval(() => {
  console.table(keys);
}, 2000);

window.addEventListener("keydown", (ev) => {
  keyDown(ev.key);
});
window.addEventListener("keyup", (ev) => {
  keyUp(ev.key);
});

function keyDown(burron) {
  let low;
  try {
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
    const low = burron.toLowerCase();
    keys[low].pressed = false;
    document.getElementById(low).style.color = "#00ff00";
  } catch (error) {}
}
