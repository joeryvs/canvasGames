const ti = "Finished rendering in";
console.time(ti);

const AllCanv = document.getElementsByTagName("canvas");

for (const canv of AllCanv) {
  console.log(canv);
  const can = canv.getContext("2d");
  console.log(can);
  const hei = canv.height;
  const wid = canv.width;
  const ffff = hei / 8;
  const rrrr = wid / 5;
  console.log(ffff, rrrr);
  can.fillStyle = rShort();
  can.lineWidth = 0;
  let StartY = 20;
  let StartX = 20;
  
  for (StartY = 0; StartY < hei; StartY += ffff) 
  {
    // for (StartX = 0; StartX < wid; StartX += rrrr) 
    {
        //   can.fillRect(StartX, startY, ffff, ffff);
        can.ellipse(StartX+20,StartY+20,rrrr/2,ffff/2,0,0,2*Math.PI,true);
        can.fillStyle = rFull();
        // can.fill()
        can.stroke();
      //   console.count("vierkant");
    }

  }
}

function rHex3() {
  return Math.floor(Math.random() * Math.pow(2, 12))
    .toString("16")
    .padStart(3, "0");
}
function rHex2() {
  return Math.floor(Math.random() * Math.pow(2, 8))
    .toString("16")
    .padStart(2, "0");
}
function rHexAny(num) {
  return Math.floor(Math.random() * Math.pow(2, 4 * num))
    .toString("16")
    .padStart(num, "0");
}

function rOneNumber() {
  const x = 16;
  return Math.floor(Math.random() * x)
    .toString(x)
    .charAt(0);
}

function rShort() {
  return `#${rOneNumber()}${rOneNumber()}${rOneNumber()}`;
}
function rFull() {
  return `#${rOneNumber()}${rOneNumber()}${rOneNumber()}${rOneNumber()}${rOneNumber()}${rOneNumber()}`;
}

function rN(max = 200, min = 0) {
  return Math.floor(Math.random() * max + min);
}

console.timeEnd(ti);
