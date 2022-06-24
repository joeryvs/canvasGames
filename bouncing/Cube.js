console.log("cube imported");
class Cube {
  constructor() {
    this.width = 40;
    this.height = 40;
    this.pos = {
      x: random.range(width - this.width),
      y: random.range(height - this.height),
    };
    this.vel = { x: random.PosOrMinusRange(5), y: random.PosOrMinusRange(2) };
    this.color = random.rFull();
  }

  drawCube() {
    art.fillStyle = this.color;
    art.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    return this;
  }
  update() {
    this.drawCube();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.y += gravity;
    if (this.pos.y + this.height >= canvas.height)
      this.vel.y *= -1;

    if (this.pos.x + this.width >= canvas.width || this.pos.x <= 0)
      this.vel.x *= -1;
  }
}

