console.log("works");

const p = document.querySelectorAll("p");
const p1 = p[0];
const p2 = p[1];

console.log(p);
const times = [
  Date.UTC(2021, 2, 21, 8),
  Date.UTC(2028, 4, 5, 8),
  Date.UTC(2022, 10, 19, 8),
  Date.UTC(2026, 3, 6, 8),
  Date.UTC(2022, 8, 5, 8),
  Date.UTC(2022, 1, 23, 5),
  Date.UTC(2023, 11, 9, 8),
];
const realTimes = times.filter((val, ind, arr) => {
  return val > Date.now();
});
console.log(realTimes);
const sortedTimes = realTimes.sort((a, b) => a - b);
console.log(sortedTimes);
const begin = sortedTimes[0];



console.log(begin);
timeShow();
setInterval(timeShow, 100);

function timeShow() {
  const now = Date.now();
  const diff = begin - now;
  const qw = TransForm3(diff);
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
function TransForm3(timeNumber) {
  const init = Math.floor(timeNumber / 1000);
  return {
    dagen: Math.floor(init / (60 * 60 * 24)),
    uur: Math.floor((init % (60 * 60 * 24)) / (60 * 60)),
    minuten: Math.floor((init % (60 * 60)) / 60),
    seconds: Math.floor(init % 60),
  };
}
