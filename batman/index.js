window.onload = main;

const canvas = document.querySelector("canvas");
const art = canvas.getContext("2d");
console.log(art);

const middleX = canvas.width * 0.5;
const middleY = canvas.height * 0.5;
const trackRadius = 250;

class Driver {
  constructor({}) {
    this.radius = 4;
    this.color = random.rFull();
    this.xCor = 1;
    this.yCor = 1;
    this.cornorPosition = 0;
    this.time = 0;
    this.timeAdvance = Math.random()/10;
    this.upper = random.randomBool();
  }

  Draw() {
    art.fillStyle = this.color;
    this.xCor = (this.time % 20) - 10;
    this.yCor = this.upper ? this.determineUpperY() : this.determineLowerY();
    const px = this.xCor * 30 + middleX;
    const py = -this.yCor * 30 + middleY;
    art.beginPath();
    art.arc(px, py, this.radius, 0, Math.PI * 2);
    art.fill();
    art.closePath();
  }
  update() {
    this.time += this.timeAdvance;
    this.Draw();
  }

  
  determineUpperY() {
    
    const firstContact = 0.5;
    const secondContact = 0.75;
    const thirdContact = 1;
    const fourthContact = 2;

    if (this.xCor > -firstContact && this.xCor < firstContact) {
      return 2.25;
    } else if (this.xCor > -secondContact && this.xCor < secondContact) {
      return 3 * Math.abs(this.xCor) + 0.75;
    } else if (this.xCor > -thirdContact && this.xCor < thirdContact) {
      return 9 - 8 * Math.abs(this.xCor);
    } else if (this.xCor > -fourthContact && this.xCor < fourthContact) {
      return (
        (6 * Math.sqrt(10)) / 7 +
        1.5 * 0.5 * Math.abs(this.xCor) -
        ((6 * Math.sqrt(10)) / 14) *
          Math.sqrt(4 - Math.pow(Math.abs(this.xCor) - 1, 2))
      );
    } else if (this.xCor < -fourthContact) {
      return Math.sqrt(3 - (3 * this.xCor * this.xCor) / 49);
    } else if (this.xCor > fourthContact) {
      return Math.sqrt(3 - (3 * this.xCor * this.xCor) / 49);
    }

    return -100;
  }

  determineLowerY() {
    const fourthContact = 3.5;
    const The_X = this.xCor;
    const WeirdNumber = (3 * Math.sqrt(33) - 7) / 112;
    if (The_X > -fourthContact && The_X < fourthContact) {
      const tt = Math.abs(Math.abs(The_X) - 2) - 1;
      return (
        Math.abs(The_X / 2) -
        WeirdNumber * The_X * The_X -
        3 +
        Math.sqrt(1 - tt * tt)
      );
    } else if (The_X < -fourthContact) {
      return -Math.sqrt(3 - (3 * The_X * The_X) / 49);
    } else if (The_X > fourthContact) {
      return -Math.sqrt(3 - (3 * The_X * The_X) / 49);
    }

    return -100;
  }
  
  
}

function main() {
  console.log("index imported");
  art.lineWidth = 20;
  animate();
}

const pack = [];
const fullCircle = setInterval(() => {
  pack.push(new Driver({}));
}, 110);
// setTimeout(() => {
//   clearInterval(fullCircle);
// }, 1000 * 14);
function animate() {
  requestAnimationFrame(animate);
//  art.clearRect(0, 0, canvas.width, canvas.height);
 // theTrack();
  pack.forEach((driv) => {
    driv.update();
  });
}

function theTrack() {
  art.lineWidth = 20;
  art.beginPath();
  art.arc(middleX, middleY, trackRadius, 0, Math.PI * 2);
  art.stroke();
  art.closePath();
}
