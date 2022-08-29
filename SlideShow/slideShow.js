console.log(33);
const imgaa = document.querySelectorAll("img");
console.log(imgaa);

const canvv = document.querySelector("canvas");
const art = canvv.getContext("2d");
let clickCount = 0;
let a = setInterval(() => {
  newImg();
  return;
}, 100);
canvv.onclick = onclickkk;

function onclickkk() {
  clickCount++;
  console.log(clickCount);
  newImg();
  return;
}

function newImg() {
  try {
    const TempImg = imgaa[clickCount % imgaa.length];
    art.clearRect(0, 0, canvv.width, canvv.height);
    art.drawImage(TempImg, 0, 0);
    clearInterval(a);
  } catch (error) {}
  return;
}
