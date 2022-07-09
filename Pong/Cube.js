console.log("cube imported");
class Shield {
  constructor({ width, height ,x,y}) {
    this.width = width === undefined ? 30 : width;
    this.height = height === undefined ? 100 : height;
    this.pos = {
      x: x,
      y: y,
    };
    this.trueColor = random.rFull();
    this.color = this.trueColor;
  }

  Draw() {
    art.fillStyle = this.color;
    art.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    return this;
  }
  type() {
    return Shield;
  }

  isTouchingObject(ojb) {
    if (ojb.type() === Shield) {
      return (
        this.pos.x + this.width >= ojb.pos.x &&
        this.pos.x <= ojb.pos.x + ojb.width &&
        this.pos.y + this.height >= ojb.pos.y &&
        this.pos.y <= ojb.pos.y + ojb.height
      );
    }
    if (ojb.type() === Orb) {
      const hor =
        this.pos.x <= ojb.pos.x + ojb.radius &&
        this.pos.x + this.width >= ojb.pos.x - ojb.radius &&
        this.pos.y <= ojb.pos.y &&
        this.pos.y + this.height >= ojb.pos.y;
      const ver =
        this.pos.y <= ojb.pos.y + ojb.radius &&
        this.pos.y + this.height >= ojb.pos.y - ojb.radius &&
        this.pos.x <= ojb.pos.x &&
        this.pos.x + this.width >= ojb.pos.x;
      // horizontal and vertical plane
      if (hor || ver) return true;
      const rxDX = this.pos.x + this.width - ojb.pos.x;
      const lyDY = this.pos.y + this.height - ojb.pos.y;
      const lxDX = this.pos.x - ojb.pos.x;
      const uyDY = this.pos.y - ojb.pos.y;
      return (
        // lower right corner of the cube
        Math.hypot(rxDX, lyDY) <= ojb.radius ||
        // lower left corner of the cube
        Math.hypot(lxDX, lyDY) <= ojb.radius ||
        // upper right corner of the cube
        Math.hypot(rxDX, uyDY) <= ojb.radius ||
        // upper left corner of the cube
        Math.hypot(lxDX, uyDY) <= ojb.radius
      );
    }
    return false;
  }
  collision() {
    // for (const cube of cubes)
    //   if (this.isTouchingObject(cube))
    //     if (!(this.pos.x === cube.pos.x && this.pos.y === cube.pos.y))
    //       return true;
    // for (const orb of orbs) if (this.isTouchingObject(orb)) return true;
    return false;
  }
}
