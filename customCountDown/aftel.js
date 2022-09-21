console.log("aftel geïmporteerd");

const clocks = document.getElementsByName("clock");
const p = document.querySelectorAll("p");
const p1 = p[0];
const p2 = p[1];

console.log(p);
console.log(clocks);
timeShow();
setInterval(timeShow, 100);


function timeShow() {
  const x = document.getElementById("clock6");
  
  const timeString = x.value;
  const OtherTime = new Date(timeString);
  const now = new Date;
  const diff = OtherTime - now;
  if (diff > 0) {
    const qw = TransForm2(diff);
    const str = `nog ${qw.dagen} dagen en ${qw.uur} uur en ${qw.minuten} minuten en ${qw.seconds} seconden`;
    p1.innerText = str;
    p2.innerText = "En dan is het   "+ timeString;
  } else {
    p1.innerText = "dat Moment is in het verleden";
    const qw = TransForm2(-diff)
    p1.innerText = "Het is"
    const str = `${qw.dagen} dagen en ${qw.uur} uur en ${qw.minuten} minuten en ${qw.seconds} seconden geleden`;
    p2.innerText = str
  }
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
