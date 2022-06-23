window.onload = main;

// variabels
const heigt = 576;
const withd = 1024;
const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");
canvv.height = heigt;
canvv.width = withd;
const gravity = 0.6;
const speed = 3;
let timer = 45;
let timerId;

const Keys = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
};

window.addEventListener("keydown", (eventtt) => {
  console.log(eventtt.key);
  KeyPress(eventtt.key);
});
window.addEventListener("keyup", (eventtt) => {
  console.log(eventtt.key);
  KeyRelease(eventtt.key);
});

function main() {
  DecreaseTime();
  animate();
}

class Sprite {
  constructor({
    position,
    velocety,
    height = 120,
    width = 60,
    Color = "green",
    offset,
  }) {
    this.position = position === undefined ? { x: 300, y: 0 } : position;
    this.velocety = velocety === undefined ? { x: 0, y: 3 } : velocety;
    this.height = height === undefined ? 120 : height;
    this.width = width === undefined ? 60 : width;
    this.Color = Color === undefined ? "green" : Color;
    this.LastKey = "";
    this.AttackBox = {
      position: { x: this.position.x, y: this.position.y },
      offset: offset,
      width: 100,
      height: 50,
    };
    this.isAttacking = false;
    this.health = 100;
    this.isGrounded = false;
    this.isFacingRight = true;
  }
  draw() {
    can.fillStyle = this.Color;
    if (this.isFacingRight) {
      can.fillRect(this.position.x, this.position.y, this.width, this.height);
      can.fillStyle = "#000";
      can.fillRect(
        this.position.x + 0.5 * this.width,
        this.position.y + 0.2 * this.height,
        0.5 * this.width,
        0.2 * this.height
      );

      if (this.isAttacking) {
        // attackbox Draw
        can.fillStyle = "gray";
        can.fillRect(
          this.AttackBox.position.x,
          this.AttackBox.position.y,
          this.AttackBox.width,
          this.AttackBox.height
        );
      }
    } else {
      can.fillRect(this.position.x, this.position.y, this.width, this.height);
      can.fillStyle = "#000";
      can.fillRect(
        this.position.x + 0.0 * this.width,
        this.position.y + 0.2 * this.height,
        0.5 * this.width,
        0.2 * this.height
      );
      if (this.isAttacking) {
        // attackbox Draw
        can.fillStyle = "gray";
        can.fillRect(
          this.AttackBox.position.x - this.AttackBox.width + this.width,
          this.AttackBox.position.y,
          this.AttackBox.width,
          this.AttackBox.height
        );
      }
    }
  }

  update() {
    this.AttackBox.position.x = this.position.x;
    this.AttackBox.position.y = this.position.y;
    this.draw();

    this.position.x += this.velocety.x;
    this.position.y += this.velocety.y;
    if (this.position.y + this.velocety.y + this.height >= canvv.height) {
      this.velocety.y = 0;
      this.position.y = canvv.height - this.height;
    } else {
      this.velocety.y += gravity;
    }
  }
  attack() {
    setTimeout(() => {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 300);
    }, 50);
  }
}

const player = new Sprite({
  position: { x: 50, y: 40 },
  velocety: { x: 0, y: 10 },
  Color: "#0ff",
  offset: { x: 0, y: 10 },
});
const enemy = new Sprite({
  position: { x: 500, y: 40 },
  velocety: { x: 0, y: 0 },
  offset: { x: -40, y: 10 },
});

function detectCollision({ attacker, reciever }) {
  return (
    attacker.AttackBox.position.x + attacker.AttackBox.width >=
      reciever.position.x &&
    attacker.AttackBox.position.x <= reciever.position.x + reciever.width &&
    attacker.AttackBox.position.y + attacker.AttackBox.height >=
      reciever.position.y &&
    attacker.AttackBox.position.y <= reciever.position.y + reciever.height
  );
}

function DecreaseTime() {
  if (timer > 0) {
    timerId = setTimeout(DecreaseTime, 1000);
    timer--;
    document.querySelector("p#Seconds.time").innerHTML = `${Math.floor(
      timer / 60
    )}:${timer % 60}`;
  }

  if (timer === 0) {
    DetermineWinner({ player1: player, Player2: enemy });
  }
}

function DetermineWinner({ player1, Player2 }) {
  clearTimeout(timerId);
  const we = document.querySelector("div#endText.text");
  const mes = document.querySelector("p#FinalMessage");
  we.style.display = "flex";
  if (player1.health === Player2.health) {
    mes.innerHTML = "hello worlds";
  } else if (player1.health >= Player2.health) {
    mes.innerHTML = "player wins";
  } else if (player1.health <= Player2.health) {
    mes.innerHTML = "the enemy wins";
  }
  return;
}

function animate() {
  let x = window.requestAnimationFrame(animate);
  can.clearRect(0, 0, withd, heigt);
  player.update();
  enemy.update();

  // facing the right way
  if (player.position.x > enemy.position.x) {
    player.isFacingRight = false;
    enemy.isFacingRight = true;
  } else if (player.position.x < enemy.position.x) {
    player.isFacingRight = true;
    enemy.isFacingRight = false;
  }
  // player movement
  player.velocety.x = 0;
  if (Keys.a.pressed && player.LastKey === "a") {
    player.velocety.x = -speed;
  } else if (Keys.d.pressed && player.LastKey === "d") {
    player.velocety.x = speed;
  }

  // enemy movement
  enemy.velocety.x = 0;
  if (Keys.ArrowLeft.pressed && enemy.LastKey === "ArrowLeft") {
    enemy.velocety.x = -speed;
  } else if (Keys.ArrowRight.pressed && enemy.LastKey === "ArrowRight") {
    enemy.velocety.x = speed;
  }

  // player attacks enemy
  if (
    detectCollision({ attacker: player, reciever: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    console.log("enemy hurt");
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }

  // enemy attacks player
  if (
    detectCollision({ attacker: enemy, reciever: player }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("player hurt");
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  // end game
  if (player.health <= 0 || enemy.health <= 0) {
    DetermineWinner({ player1: player, Player2: enemy });
    cancelAnimationFrame(x);
  }
  return;
}

function KeyPress(button) {
  switch (button) {
    case "ArrowLeft":
      enemy.LastKey = "ArrowLeft";
      Keys.ArrowLeft.pressed = true;
      break;
    case "ArrowDown":
      enemy.LastKey = "ArrowDown";
      break;
    case "ArrowRight":
      enemy.LastKey = "ArrowRight";
      Keys.ArrowRight.pressed = true;
      break;
    case "ArrowUp":
      enemy.velocety.y = -20;
      Keys.ArrowUp.pressed = true;
      break;
    case "m":
      enemy.attack();
      break;
    case " ":
      player.attack();
      break;
    case "d":
      Keys.d.pressed = true;
      player.LastKey = "d";
      break;
    case "a":
      Keys.a.pressed = true;
      player.LastKey = "a";
      break;
    case "w":
      player.velocety.y = -20;
      break;
    case "s":
      break;
    default:
      break;
  }
}

function KeyRelease(inp) {
  switch (inp) {
    case "ArrowLeft":
      Keys.ArrowLeft.pressed = false;
      break;
    case "ArrowDown":
      break;
    case "ArrowRight":
      Keys.ArrowRight.pressed = false;
      break;
    case "ArrowUp":
      Keys.ArrowUp.pressed = false;
      break;
    case "d":
      Keys.d.pressed = false;
      break;
    case "a":
      Keys.a.pressed = false;
      break;
    default:
      break;
  }
}
