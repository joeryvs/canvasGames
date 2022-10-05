console.log("works");
const NedFormatter = new Intl.RelativeTimeFormat("nl");
console.log(NedFormatter);

const p = document.querySelectorAll("p");
const p1 = p[0];
const p2 = p[1];

console.log(p);
const times = [
  new Date("2022-10-23T23:00"),
  new Date("2022-10-21T13:30"),
  new Date("2022-10-17T09:00"),
  new Date("2022-10-03T09:00"),
  new Date("2022-10-10T09:00"),
  new Date("2022-10-11T17:00"),
  new Date("2022-10-31T23:00"),
  new Date("2022-11-08T17:00"),
  new Date("2022-11-14T09:00"),
];
const realTimes = times.filter((val, ind, arr) => {
  return val > new Date();
});
console.log(realTimes);
const sortedTimes = realTimes.sort((a, b) => a - b);
console.log(sortedTimes);
const begin = sortedTimes[0];

console.log(begin);
timeShow();
setInterval(timeShow, 100);

function timeShow() {
  const now = new Date();
  const diff = begin.getTime() - now.getTime();
  const qw = InformationShow(begin);
  //const qw = TransForm3(diff);
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

function InformationShow(future = begin) {
  const obj = {};
  const now = new Date();
  const init = Math.floor((future.getTime() - now.getTime()) / 1000);
  // obj.x = now.getTimezoneOffset()
  obj.dagen = Math.floor(init / (60 * 60 * 24));
  obj.uur = 24 - now.getHours() + future.getHours();
  obj.minuten = 59 - now.getMinutes() + future.getMinutes();
  obj.seconds = 59 - now.getSeconds() + future.getSeconds();
  return obj;
}
