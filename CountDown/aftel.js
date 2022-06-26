console.log("works");

const p = document.querySelector("p");
console.log(p);
const begin = Date.UTC(2022, 8, 4, 8);
console.log(begin);
timeShow();
setInterval(timeShow, 100);

function timeShow() {
  const now = Date.now();
  const diff = begin - now;
  const qw = TransForm(diff);
  const str = `nog ${qw.dagen} dagen en ${qw.uur} uur en ${qw.minuten} minuten en ${qw.seconds} seconden`;
  p.innerText = str;
}

function TransForm(timeNumber) {
  const obj = {};
  let werkelijk = Math.floor(timeNumber / 1000);
  obj.dagen = Math.floor(werkelijk / (60 * 60 * 24));
  werkelijk = werkelijk % (obj.dagen * 60 * 60 * 24);
  obj.uur = Math.floor(werkelijk / (60 * 60));
  werkelijk = werkelijk % (obj.uur * (60 * 60));
  obj.minuten = Math.floor(werkelijk / 60);
  werkelijk = werkelijk % (obj.minuten * 60);
  obj.seconds = Math.floor(werkelijk);

  return obj;
}
