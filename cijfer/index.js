const gokkans = document.querySelector("#gokkans");
const points = document.querySelector("#points");
const maxPoints = document.querySelector("#maxPoints");
const hallmark = document.querySelector("#hallmark");

console.log(gokkans,points,maxPoints,hallmark);
let mp, currentpoint,theHallMark, geusscorrect;
gokkans;


const canvv1 = document.querySelector("canvas#main")
const canvv2 = document.querySelector("canvas#extra")
console.log(canvv2);
const art = canvv2.getContext("2d");

const canvas = document.querySelector("canvas");
// const art = canvas.getContext("2d");
art.textAlign = "center"
art.font = "100px sans-serif"
Draw();
function Draw() {
    requestAnimationFrame(Draw);
    console.log(art);
    // art.fillRect(40,40,300,300);
    let b = 88;
    art.fillText(b, 200,200,400)
}