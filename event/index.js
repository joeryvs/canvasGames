console.log("hello world");

const h1 = window.document.querySelector("h1");
const h2 = window.document.querySelector("h2");
const h3 = window.document.querySelector("h3");
const h4 = window.document.querySelector("h4");
const h5 = window.document.querySelector("h5");
const h6 = window.document.querySelector("h6");

// addEventListener("keydown", (x) => {
//   console.log(x);
//   h1.innerText = `${x.code}`;
// });
addEventListener("keypress", (x) => {
  console.table(x);
  h2.innerText = `${x}`;
});
// addEventListener("keyup", (x) => {
//   console.log(x);
//   h3.innerText = `${x.key}`;
// });

addEventListener("online", (ev) => console.log(ev));
// addEventListener("afterprint", (ev) => console.log(ev));
addEventListener("auxclick", (ev) => thisPage(ev));
addEventListener("click", (ev) => console.log(ev));
addEventListener("close", (ev) => open("https://google.com"));
addEventListener("dblclick", (ev) => thisPage(ev));
// addEventListener("mousedown", (ev) => console.log(ev));
// addEventListener("mouseenter", (ev) => console.log(ev));
// addEventListener("mouseleave", (ev) => console.log(ev));
addEventListener("mousemove", (ev) =>
  h4Change({ xCor: ev.screenX, yCor: ev.screenY })
);
window.addEventListener("beforeprint", (test) => {
  console.table(test);
  document.body.innerText = "";
});
// addEventListener("mouseout", (ev) => console.table(ev));
// addEventListener("mouseover", (ev) => console.table(ev));
// addEventListener("mouseup", (ev) => console.table(ev));
h2.addEventListener("mousemove", (ev) => {
  // console.log(ev);
  open("chrome://newtab");
});
h2.addEventListener("click", (ev) => {
  console.log(ev);
  open("/chrome/newtab");
});
window.addEventListener("pagehide", (ev) => thisPage(ev));

function thisPage(ev) {
  console.table(ev);
  open("/canvasGames/event");
}

function h4Change({ xCor, yCor }) {
  const str = `     ${xCor},  ${yCor}      `;
  h4.innerText = str;
  return;
}

function h5Change(args = "") {
  const str = `     ${xCor},  ${yCor}      `;
  h5.innerText = str;
  return;
}
