console.log("works");

const p = document.querySelector("p");
console.log(p);
const begin = Date.UTC(2022, 8, 1);
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
  let werkelijk = Math.floor(timeNumber / 1000);
  const dagen = Math.floor(werkelijk / (60 * 60 * 24));
  werkelijk = werkelijk % (dagen * 60 * 60 * 24);
  const uur = Math.floor(werkelijk / (60 * 60));
  werkelijk = werkelijk % (uur * (60 * 60));
  const minuten = Math.floor(werkelijk / 60);
  werkelijk = werkelijk % (minuten * 60);
  const seconds = Math.floor(werkelijk);

  const ob = {
    seconds: seconds,
    minuten: minuten,
    uur: uur,
    dagen: dagen,
  };

  return ob;
}
