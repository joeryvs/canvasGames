class Orb {
  constructor({ radius }) {
    this.radius = radius === undefined ? 20 : radius;
    this.width = 2 * this.radius;
    this.height = 2 * this.radius;
    this.pos = {
      x: random.range(canvas.width - this.radius * 2) + this.radius,
      y: random.range(canvas.height - this.radius * 2) + this.radius,
    };
    this.vel = { x: random.PosOrMinusRange(5), y: random.PosOrMinusRange(2) };
    this.color = random.rFull();
  }

  drawOrb() {
    art.strokeStyle = "#000";
    art.fillStyle = this.color;
    art.beginPath();
    art.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    art.fill();
    art.stroke();
    art.closePath();
    return this;
  }
  update() {
    this.drawOrb();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.vel.y += gravity;
    if (this.pos.y + this.radius >= canvas.height) this.vel.y *= -1;

    if (this.pos.x + this.radius >= canvas.width || this.pos.x <= this.radius)
      this.vel.x *= -1;
  }
}
