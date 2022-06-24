var canvas1 = document.getElementById("game1");
var canvas2 = document.getElementById("game2");
const ttt = canvas1.getContext("2d");
const yyy = canvas2.getContext("2d");
ttt.fillStyle = "#ff00ff";
ttt.fillRect(30, 30, 100, 80);

yyy.fillStyle = "#00ffff";
yyy.moveTo(0, 0);
yyy.lineTo(200, 100);
yyy.stroke();
yyy.beginPath();
yyy.arc(100, 100, 60, 0, 90, false);
yyy.stroke();

console.log(typeof yyy, typeof ttt);
// const canvas = document.getElementById("canv3");
// const ctx = canvas.getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 150, 75);

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);

var ctx = canvas1.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

var ctx = canvas2.getContext("2d");
ctx.font = "30px Arial";
ctx.strokeText("Hello World", 10, 50);


window.onload = function() {
    var canvas = document.getElementById("scream");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("paint");
    ctx.drawImage(img, 10, 10);
  };