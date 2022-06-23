window.onload = main;

// variabels
const heigt = 300;
const withd = 800;
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
  s: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowDown: { pressed: false },
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
    MaxHealth = 100,
  }) {
    this.position = position === undefined ? { x: 300, y: 0 } : position;
    this.velocety = velocety === undefined ? { x: 0, y: 3 } : velocety;
    this.height = height === undefined ? 120 : height;
    this.width = width === undefined ? 60 : width;
    this.Color = Color === undefined ? "green" : Color;
    this.LastKey = "";
    this.AttackBox = {
      width: 100,
      height: 50,
    };
    this.AttackBox = {
      width: 100,
      height: 50,
      position: {
        ux: this.position.x,
        uy: this.position.y,
        lx: this.position.x - this.AttackBox.width,
        ly: this.position.y - this.AttackBox.height,
      },
    };
    this.isHighAttacking = false;
    this.isLowAttacking = false;
    this.MaxHealth = MaxHealth === undefined ? 100 : MaxHealth;
    this.health = this.MaxHealth;
    this.isGrounded = false;
    this.isFacingRight = true;
    this.isFrozen = false;
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

      if (this.isHighAttacking) {
        // attackbox Draw
        can.fillStyle = "gray";
        can.fillRect(
          this.AttackBox.position.ux,
          this.AttackBox.position.uy,
          this.AttackBox.width,
          this.AttackBox.height
        );
      }
      console.log(this.isLowAttacking);
      if (this.isLowAttacking) {
        // attackbox Draw
        can.fillStyle = "gray";
        can.fillRect(
          this.position.x + 0.6*this.width ,
          this.position.y + this.height - this.AttackBox.height,
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
      if (this.isHighAttacking) {
        // attackbox Draw
        can.fillStyle = "gray";
        can.fillRect(
          this.AttackBox.position.ux - this.AttackBox.width + this.width,
          this.AttackBox.position.uy,
          this.AttackBox.width,
          this.AttackBox.height
        );
      }
    }
  }

  update() {
    this.AttackBox.position.ux = this.position.x;
    this.AttackBox.position.uy = this.position.y;
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
  highAttack() {
    this.isFrozen = true;
    setTimeout(() => {
      this.isHighAttacking = true;
      setTimeout(() => {
        this.isHighAttacking = false;
      }, 300);
    }, 50);
    setTimeout(() => (this.isFrozen = false), 450);
  }
  lowAttack() {
    this.isFrozen = true;
    setTimeout(() => {
      this.isLowAttacking = true;
      setTimeout(() => {
        this.isLowAttacking = false;
      }, 700);
    }, 100);
    setTimeout(() => (this.isFrozen = false), 1000);
  }
}

const player = new Sprite({
  position: { x: 50, y: 40 },
  velocety: { x: 0, y: 10 },
  Color: "#0ff",
});
console.log(player);
const enemy = new Sprite({
  position: { x: 500, y: 40 },
  velocety: { x: 0, y: 0 },
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

// unused
function DetermineSpeed(Sprite) {
  if (Sprite.isFrozen) return 0;
  if (Keys.ArrowLeft.pressed && Sprite.LastKey === "ArrowLeft") return -speed;
  if (Keys.ArrowRight.pressed && Sprite.LastKey === "ArrowRight") return speed;
  return 0;
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
  if (player.isFrozen) player.velocety.x = 0;
  else if (Keys.a.pressed && player.LastKey === "a") player.velocety.x = -speed;
  else if (Keys.d.pressed && player.LastKey === "d") player.velocety.x = speed;
  else player.velocety.x = 0;

  // enemy movement
  if (enemy.isFrozen) enemy.velocety.x = 0;
  else if (Keys.ArrowLeft.pressed && enemy.LastKey === "ArrowLeft")
    enemy.velocety.x = -speed;
  else if (Keys.ArrowRight.pressed && enemy.LastKey === "ArrowRight")
    enemy.velocety.x = speed;
  else enemy.velocety.x = 0;

  enemy.velocety.x = enemy.isFrozen
    ? 0
    : Keys.ArrowLeft.pressed && enemy.LastKey === "ArrowLeft"
    ? -speed
    : Keys.ArrowRight.pressed && enemy.LastKey === "ArrowRight"
    ? speed
    : 0;

  player.velocety.x = player.isFrozen
    ? 0
    : Keys.a.pressed && player.LastKey === "a"
    ? -speed
    : Keys.d.pressed && player.LastKey === "d"
    ? speed
    : 0;
  // player attacks enemy
  if (
    detectCollision({ attacker: player, reciever: enemy }) &&
    player.isHighAttacking
  ) {
    player.isHighAttacking = false;
    console.log("enemy hurt");
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }
  // enemy attacks player
  if (
    detectCollision({ attacker: enemy, reciever: player }) &&
    enemy.isHighAttacking
  ) {
    enemy.isHighAttacking = false;
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
      enemy.LastKey = button;
      Keys.ArrowLeft.pressed = true;
      break;
    case "ArrowDown":
      // enemy.LastKey = "ArrowDown";
      Keys.ArrowDown.pressed = true;
      enemy.lowAttack();
      break;
    case "ArrowRight":
      enemy.LastKey = button;
      Keys.ArrowRight.pressed = true;
      break;
    case "ArrowUp":
      Keys.ArrowUp.pressed = true;
      enemy.highAttack();
      break;
    case "m":
      enemy.attack();
      break;
    case " ":
      player.attack();
      break;
    case "d":
      Keys.d.pressed = true;
      player.LastKey = button;
      break;
    case "a":
      Keys.a.pressed = true;
      player.LastKey = button;
      break;
    case "w":
      player.highAttack();
      Keys.ArrowUp.pressed = true;
      break;
    case "s":
      Keys.s.pressed = true;
      player.lowAttack();
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
      Keys.ArrowDown.pressed = true;
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
    case "s":
      Keys.s.pressed = false;
      break;
    default:
      break;
  }
}
