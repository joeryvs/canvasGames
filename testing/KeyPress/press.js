console.log("succes");

const keys = {};
const input = {
  a: "a",
  A: "a",
  b: "b",
  B: "b",
  c: "c",
  C: "c",
  d: "d",
  D: "d",
  e: "e",
  E: "e",
  f: "f",
  F: "f",
  g: "g",
  G: "g",
  h: "h",
  H: "h",
  i: "i",
  I: "i",
  j: "j",
  J: "j",
  k: "k",
  K: "k",
  l: "l",
  L: "l",
  m: "m",
  M: "m",
  n: "n",
  N: "n",
  o: "o",
  O: "o",
  p: "p",
  P: "p",
  q: "q",
  Q: "q",
  r: "r",
  R: "r",
  s: "s",
  S: "s",
  t: "t",
  T: "t",
  u: "u",
  U: "u",
  v: "v",
  V: "v",
  w: "w",
  W: "w",
  x: "x",
  X: "x",
  y: "y",
  Y: "y",
  z: "z",
  Z: "z",
  Shift: "shift",
  Tab: "tab",
  Control: "control",
  CapsLock: "capslock",
  Enter: "enter",
  1: "1",
  "!": "1",
  2: "2",
  "@": "2",
  3: "3",
  "#": "3",
  4: "4",
  $: "4",
  5: "5",
  "%": "5",
  6: "6",
  "^": "6",
  7: "7",
  "&": "7",
  8: "8",
  "*": "8",
  9: "9",
  "(": "9",
  0: "0",
  ")": "0",
  "-": "-",
  _: "-",
  "=": "=",
  "+": "=",
  "[": "[",
  "{": "[",
  "]": "]",
  "}": "]",
  "\\": "\\",
  "|": "\\",
  ";": ";",
  ":": ";",
  ",": ",",
  "<": ",",
  ".": ".",
  ">": ".",
  "/": "/",
  "?": "/",
  ArrowRight: "arrowright",
  ArrowLeft: "arrowleft",
  ArrowUp: "arrowup",
  ArrowDown: "arrowdown",
};
// setInterval(() => {
//   console.table(keys);
// }, 3000);

window.addEventListener("keydown", (ev) => {
  console.log(ev.key);
  keyDown(input[ev.key]);
});
window.addEventListener("keyup", (ev) => {
  keyUp(input[ev.key]);
});

function keyDown(burron) {
  try {
    console.log(burron);
    if (keys[burron] === undefined) {
      keys[burron] = {};
    }
    keys[burron].pressed = true;
  } catch (error) {}
  try {
    const temp = document.getElementById(burron);
    temp.style.color = "#ff0000";
    temp.style.display = "block";
  } catch (error) {}

  try {
    const tempClass = document.getElementsByClassName(burron);
    for (let index = 0; index < tempClass.length; index++) {
      const element = tempClass[index];
      element.style.color = "#ff0000";
    }
  } catch (error) {}
}

function keyUp(burron) {
  try {
    keys[burron].pressed = false;
  } catch (error) {}
  try {
    document.getElementById(burron).style.color = "#00ff00";
  } catch (error) {}
  try {
    const tempClass = document.getElementsByClassName(burron);
    for (let index = 0; index < tempClass.length; index++) {
      const element = tempClass[index];
      element.style.color = "#00ff00";
      element.style.display = "block";
    }
  } catch (error) {}
}
