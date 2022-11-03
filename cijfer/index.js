window.onload = main;

const gokkans = document.querySelector("#gokkans");
const points = document.querySelector("#points");
const maxPoints = document.querySelector("#maxPoints");
const hallmark = document.querySelector("#hallmark");

// console.log(gokkans);
// console.log(gokkans,points,maxPoints,hallmark);


let mp,  theHallMark, geusscorrect;

const canvv1 = document.querySelector("canvas#main");
const canvv2 = document.querySelector("canvas#extra");

const height = canvv1.height;
const width = canvv1.width;

canvv2.height = height;
canvv2.width = width;

const canExtra = canvv2.getContext("2d");
const pop = canvv1.getContext("2d");



console.log(canvv2);

// const art = canvas.getContext("2d");
canExtra.textAlign = "center";
canExtra.font = "100px sans-serif";
console.log(maxPoints);
const ActualVal = new CijferBerekenen({points:0,maxPoints: mp,gokkans: geusscorrect, hallmark:theHallMark});
function Draw(cans = canExtra, { height, width }) {
  let b = ActualVal.cijfer();
  cans.clearRect(0, 0, canvv1.width, canvv1.height);
  cans.fillText(b, width * 0.5, height * 0.5, height);
}

function DrawGraph( canv = canvv1 , {}) {
  const pop = canvv1.getContext("2d");
  const r = [];
  for (let i = 0; i < mp; i += 0.25) {
    const inf = {
      maxPoints: mp,
      points: i,
      gokkans: geusscorrect,
      hallmark: theHallMark,
    };
    const cijf = new CijferBerekenen(inf);
    r.push(cijf);
  }
  pop.clearRect(0, 0, canvv1.width, canvv2.height);
  pop.beginPath();
  for (const Cijfer of r) {
    const t = Cijfer.canvasCors(canvv1);
    pop.lineTo(t.x, t.y);
  }
  pop.stroke();
  pop.closePath();
}

function UpdateVar() {
  mp = Number(maxPoints.value);
  geusscorrect = Number(gokkans.value);
  currentpoint = Number(points.value);
  theHallMark = Number(hallmark.value);
  gokkans.max = points.max = maxPoints.value;
  ActualVal.punten = currentpoint;
  ActualVal.maxPoints = mp;
  ActualVal.gokkans = geusscorrect;
  ActualVal.hallmark= theHallMark
  DrawGraph(canvv2, {});
  Draw(canExtra, canvv2);
}
function main() {
  console.log("succes");
  UpdateVar();

  return;
}

for (const inputt of document.querySelectorAll("input")) {
  console.log(inputt);
  inputt.onchange = UpdateVar
}