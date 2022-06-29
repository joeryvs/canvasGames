class Generation {
  constructor(length, width = 2*length, alive = "1", dead = "0") {
    this.lenght = length;
    this.width = width;
    this.TrueSymbol = alive;
    this.FalseSymbol = dead;
    this.arr = {};
    this.ToNewArena();
    this.arrLeft = {};
    this.arrRight = {};
    this.arrUP = {};
    this.arrDown = {};
    this.arrUpLeft = {};
    this.arrUpRight = {};
    this.arrDownLeft = {};
    this.arrDownRight = {};
    this.arrTotal = {};
    this.neighbors()
  }

  NextGen() {
    this.neighbors();
    this.calc_sum();
    const ems = this.cal_new();
    this.arr = ems;
    return this;
  }

  calc_To_left() {
    const temp = {};
    for (let i = 0; i < this.lenght; i++) {
      temp[i] = {};
      for (let j = 0; j < this.width; j++) {
        temp[i][j] = j + 1 < this.width ? this.arr[i][j + 1] : this.arr[i][0];
      }
    }
    return temp;
  }
  calc_To_right(center = this.arr) {
    const temp = {};
    for (let i = 0; i < this.lenght; i++) {
      temp[i] = {};
      for (let j = 0; j < this.width; j++) {
        temp[i][j] = j > 0 ? this.arr[i][j - 1] : this.arr[i][this.width - 1];
      }
    }
    return temp;
  }

  calcDownWard(up1 = this.arr) {
    let temp = {};
    for (let i = 0; i < this.lenght; i++) {
      temp[i] = i > 0 ? up1[i - 1] : up1[i];
    }
    return temp;
  }
  calcUpward(down1 = this.arr) {
    let temp = {};
    for (let i = 0; i < this.lenght; i++) {
      temp[i] = i + 1 < this.lenght ? down1[i + 1] : down1[0];
    }
    return temp;
  }

  neighbors() {
    this.arrLeft = this.calc_To_left();
    this.arrRight = this.calc_To_right(this.arr);
    this.arrUP = this.calcUpward(this.arr);
    this.arrUpLeft = this.calcUpward(this.arrLeft);
    this.arrUpRight = this.calcUpward(this.arrRight);
    this.arrDown = this.calcDownWard(this.arr);
    this.arrDownLeft = this.calcDownWard(this.arrLeft);
    this.arrDownRight = this.calcDownWard(this.arrRight);
    return this;
  }

  calc_sum() {
    const arrrr = {};
    for (let i = 0; i < this.lenght; i++) {
      arrrr[i] = {};
      for (let j = 0; j < this.width; j++) {
        let sum =
          this.arrLeft[i][j] +
          this.arrRight[i][j] +
          this.arrUP[i][j] +
          this.arrUpRight[i][j] +
          this.arrUpLeft[i][j] +
          this.arrDown[i][j] +
          this.arrDownLeft[i][j] +
          this.arrDownRight[i][j];
        arrrr[i][j] = sum;
      }
    }
    this.arrTotal = arrrr;
    return this;
  }

  cal_new() {
    const z = {};
    for (let i = 0; i < this.lenght; i++) {
      z[i] = {};
      for (let j = 0; j < this.width; j++) {
        const wert = this.arrTotal[i][j];
        const orgElm = this.arr[i][j];
        z[i][j] = wert == 3 || (orgElm == 1 && wert == 2) ? 1 : 0;
      }
    }
    this.arr = z;
    return z;
  }

  ToNewArena() {
    let x = {};
    for (let i = 0; i < this.lenght; i++) {
      x[i] = {};
      for (let j = 0; j < this.width; j++) {
        x[i][j] = Math.round(Math.random());
      }
    }
    this.arr = x
    return x;
  }

  show4() {
    let str = "";
    for (let i = 0; i < this.lenght; i++) {
      for (let j = 0; j < this.width; j++) {
        str += this.arr[i][j] ? `${this.TrueSymbol}` : `${this.FalseSymbol}`;
      }
      str += "\n";
    }
    console.log(str);
    return str;
  }
  artLife() {
    for (let i = 0; i < this.lenght; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.arr[i][j]) blockDraw(i, j);
      }
    }
    return;
  }
}
function main() {
  const c = new Generation(20, (alive = "#"), (dead = " "));
  c.arr = c.ToNewArena();
  console.log(c.arr);
  c.NextGen();
  c.show4();
  for (let a = 1; a < 100; a++) {
    setTimeout(() => {
      console.clear();
      c.NextGen().show4();
    }, a * 900);
  }
}
