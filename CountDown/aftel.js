console.log("works");

const p = document.querySelectorAll("p");
const p1 = p[0];
const p2 = p[1];

console.log(p);
const begin = Date.UTC(2022, 8, 5,8);
console.log(begin);
timeShow();
setInterval(timeShow, 100);

function timeShow() {
  const now = Date.now();
  const diff = begin - now;
  const qw = TransForm2(diff);
  const str = `nog ${qw.dagen} dagen en ${qw.uur} uur en ${qw.minuten} minuten en ${qw.seconds} seconden`;
  p1.innerText = str;
}

function TransForm2(timeNumber) {
  const obj = {};
  const init = Math.floor(timeNumber / 1000);
  obj.dagen = Math.floor(init / (60 * 60 * 24));
  obj.uur = Math.floor((init % (60 * 60 * 24)) / (60 * 60));
  obj.minuten = Math.floor((init % (60 * 60)) / 60);
  obj.seconds = Math.floor(init % 60);

  return obj;
}
