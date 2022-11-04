window.onload = main;

const gokkans = document.querySelector("input#gokkans");
const points = document.querySelector("input#points");
const maxPoints = document.querySelector("input#maxPoints");
const hallmark = document.querySelector("input#hallmark");

for (const inputt of document.querySelectorAll("input")) {
  inputt.onchange = UpdateVar;
}

let mp, theHallMark, geusscorrect;

const allCanvas = document.querySelectorAll("canvas");
const canvv1 = allCanvas[0];
const canvv2 = allCanvas[1];

const canExtra = canvv2.getContext("2d");
const pop = canvv1.getContext("2d");

console.log(canvv2);

// const art = canvas.getContext("2d");

console.log(maxPoints);
const ActualVal = new CijferBerekenen({});

function Draw(cans = canvv2) {
  const art = cans.getContext("2d");
  art.clearRect(0, 0, cans.width, cans.height);
  art.textAlign = "center";
  art.font = "100px sans-serif";
  const output = Math.round(ActualVal.cijfer() * 1000) / 100;
  art.fillText(output, cans.width * 0.5, cans.height * 0.5, cans.height);
}

function DrawGraph(canv = canvv1) {
  const pop = canv.getContext("2d");
  const r = [];
  for (let i = 0; i < mp; i += 0.25) {
    const inf = {
      maxPoints: mp,
      points: i,
      gokkans: geusscorrect,
      hallmark: theHallMark,
    };
    // const cijf = new CijferBerekenen(inf);
    r.push(new CijferBerekenen(inf));
  }
  pop.clearRect(0, 0, canv.width, canv.height);
  pop.beginPath();
  for (const Cijfer of r) {
    const t = Cijfer.canvasCors(canvv1);
    pop.lineTo(t.x, t.y);
  }
  pop.stroke();
  pop.closePath();
  const ter = ActualVal.canvasCors(canv);
  ter.r = 5;
  ter.color = "red";
  smallCircle(pop, ter);
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
  ActualVal.hallmark = theHallMark;
  DrawGraph(canvv1);
  Draw(canvv2);
}
function main() {
  console.log("succes");

  UpdateVar();

  return;
}

function smallCircle(
  canvass = canvv1.getContext("2d"),
  { x = 0, y = 0, r = 3, color = "red" }
) {
  const storage = canvass.fillStyle;
  canvass.fillStyle = color;
  canvass.beginPath();
  canvass.arc(x, y, r, 0, Math.PI * 2);
  canvass.fill();
  canvass.closePath();
  canvass.fillStyle = storage;
  return;
}
