const hhh1 = document.querySelector("h1");
const hhh2 = document.querySelector("h2");
const hhh3 = document.querySelector("h3");
const hhh4 = document.querySelector("h4");
const hhh5 = document.querySelector("h5");
const hhh6 = document.querySelector("h6");

setInterval(qwerty, 1000);
setInterval(test, 5000);

function test() {
  hhh1.innerText = "Hello world!";
}

let count = 0;

function qwerty() {
  count++;
  hhh3.innerText = `${count}`;
}
