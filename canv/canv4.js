const start = "start";
console.time(start);


window.ondblclick = function(){
  action();
} 


function action() {
  const allCanvasss = document.getElementsByTagName("canvas");
  for (const canv of allCanvasss) {
    let can = canv.getContext("2d");
    const size = 240;
    const mid = size * 0.5;
    // console.log(canv);
    // console.log(can);
    canv.setAttribute("height", size);
    canv.setAttribute("width", size);
    can.lineWidth = 5;
    can.fillStyle = rFull();
    can.shadowColor = "rgba(0, 100, 100, 50)";
    can.strokeStyle = rShort();
    can.lineTo(0, 0);
    can.lineTo(size, size);
    can.stroke();

    can.moveTo(0, size);
    can.lineTo(size, 0);
    can.stroke();

    can.ellipse(mid, mid, 100, 100, 0, 0, 2 * Math.PI, false);
    // can.stroke();
    can.font = "40px sans-serif";
    can.letterSpacing = "2px";
    can.fillStyle = rFull();
    can.textAlign = "center";
    
    can.beginPath();
    can.lineTo(mid,20)
    can.lineTo(20,20)
    can.lineTo(mid,mid)
    can.closePath();
    
    can.stroke()
    
    can.createRadialGradient(mid,size,0,size,mid,4);
    can.stroke()
    // can.fillText("etenstijd", mid, mid);
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

action()
console.timeEnd(start);
