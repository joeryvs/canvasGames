console.log("Orb imported");
class Orb {
  constructor({ radius }) {
    this.radius = radius === undefined ? 20 : radius;
    this.width = 2 * this.radius;
    this.height = 2 * this.radius;
    this.pos = {
      x: random.range(canvas.width - this.radius * 2) + this.radius,
      y: random.range(canvas.height - this.radius * 2) + this.radius,
    };
    this.vel = {
      x: random.PosOrMinusRange(5),
      y: random.PosOrMinusRange(5),
    };
    this.trueColor = random.rFull();
    this.color = this.trueColor;
  }

  Draw() {
    // art.strokeStyle = "#000";
    art.fillStyle = this.collision() ? this.color + "55" : this.color;
    art.beginPath();
    art.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    art.fill();
    // art.stroke();
    art.closePath();
    return this;
  }
  update() {
    this.Draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    // this.vel.y += gravity
    if (this.pos.y + this.radius >= canvas.height || this.pos.y <= this.radius)
      this.vel.y *= -1;

    if (this.pos.x + this.radius >= canvas.width || this.pos.x <= this.radius)
      this.vel.x *= -1;
  }
  type() {
    return Orb;
  }

  isTouchingObject(ojb) {
    if (ojb.type() === Orb) {
      const DX = this.pos.x - ojb.pos.x;
      const DY = this.pos.y - ojb.pos.y;
      return Math.hypot(DX, DY) <= this.radius + ojb.radius;
    }
    if (ojb.type() === Cube) {
      const hor =
        ojb.pos.x <= this.pos.x + this.radius &&
        ojb.pos.x + ojb.width >= this.pos.x - this.radius &&
        ojb.pos.y <= this.pos.y &&
        ojb.pos.y + ojb.height >= this.pos.y;
      const ver =
        ojb.pos.y <= this.pos.y + this.radius &&
        ojb.pos.y + ojb.height >= this.pos.y - this.radius &&
        ojb.pos.x <= this.pos.x &&
        ojb.pos.x + ojb.width >= this.pos.x;
      // horizontal and vertical plane
      if (hor || ver) return true;
      const rxDX = ojb.pos.x + ojb.width - this.pos.x;
      const lyDY = ojb.pos.y + ojb.height - this.pos.y;
      const lxDX = ojb.pos.x - this.pos.x;
      const uyDY = ojb.pos.y - this.pos.y;
      return (
        // lower right corner of the cube
        Math.hypot(rxDX, lyDY) <= this.radius ||
        // lower left corner of the cube
        Math.hypot(lxDX, lyDY) <= this.radius ||
        // upper right corner of the cube
        Math.hypot(rxDX, uyDY) <= this.radius ||
        // upper left corner of the cube
        Math.hypot(lxDX, uyDY) <= this.radius
      );
    }
    return false;
  }

  collision() {
    for (const orb of orbs)
      if (this.isTouchingObject(orb))
        if (!(this.pos.x === orb.pos.x && this.pos.y === this.pos.y))
          return true;
    for (const cube of cubes) if (this.isTouchingObject(cube)) return true;
    return false;
  }
}

function isTouchingObject(orb2) {
  if (ojbect1.type() === Orb && ssss2.type() === Orb) {
    const DX = ojbect1.pos.x - ssss2.pos.x;
    const DY = ojbect1.pos.y - ssss2.pos.y;
    return Math.hypot(DX, DY) <= ojbect1.radius + ssss2.radius;
  } else if (ojbect1.type() === Orb && ssss2.type() === Cube) {
    const hor =
      ssss2.pos.x <= ojbect1.pos.x + ojbect1.radius &&
      ssss2.pos.x + ssss2.width >= ojbect1.pos.x - ojbect1.radius &&
      ssss2.pos.y <= ojbect1.pos.y &&
      ssss2.pos.y + ssss2.height >= ojbect1.pos.y;
    const ver =
      ssss2.pos.y <= ojbect1.pos.y + ojbect1.radius &&
      ssss2.pos.y + ssss2.height >= ojbect1.pos.y - ojbect1.radius &&
      ssss2.pos.x <= ojbect1.pos.x &&
      ssss2.pos.x + ssss2.width >= ojbect1.pos.x;
    // horizontal and vertical plane
    if (hor || ver) return true;
    const rxDX = ssss2.pos.x + ssss2.width - ojbect1.pos.x;
    const lyDY = ssss2.pos.y + ssss2.height - ojbect1.pos.y;
    const lxDX = ssss2.pos.x - ojbect1.pos.x;
    const uyDY = ssss2.pos.y - ojbect1.pos.y;
    return (
      // lower right corner of the cube
      Math.hypot(rxDX, lyDY) <= ojbect1.radius ||
      // lower left corner of the cube
      Math.hypot(lxDX, lyDY) <= ojbect1.radius ||
      // upper right corner of the cube
      Math.hypot(rxDX, uyDY) <= ojbect1.radius ||
      // upper left corner of the cube
      Math.hypot(lxDX, uyDY) <= ojbect1.radius
    );
  }
  return false;
}
