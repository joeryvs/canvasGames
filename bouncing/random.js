console.log("random imported");

class random {
  static number(...args) {
    if (args.length === 1) {
      return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2) {
      const verschil = Math.abs(args[1] - args[0]);
      const laagste = Math.min(args[1], args[0]);
      return Math.floor(Math.random() * verschil + laagste);
    } else if (args.length === 0) {
      return 0;
    } else {
      const verschil = Math.abs(args[1] - args[0]);
      const laagste = Math.min(args[1], args[0]);
      const step = args[2];
      return Math.floor(Math.random() * verschil + laagste);
    }
  }

  static rHex3() {
    return Math.floor(Math.random() * Math.pow(2, 12))
      .toString(16)
      .padStart(3, "0");
  }
  static rHex2() {
    return Math.floor(Math.random() * Math.pow(2, 8))
      .toString(16)
      .padStart(2, "0");
  }
  static rHexAny(num) {
    return Math.floor(Math.random() * Math.pow(2, 4 * num))
      .toString(16)
      .padStart(num, "0");
  }

  static rOneNumber() {
    const x = 16;
    return Math.floor(Math.random() * x)
      .toString(x)
      .charAt(0);
  }

  static rShort() {
    return `#${random.rHex3}`;
  }
  static rFull() {
    return `#${random.rHexAny(6)}`;
  }

  static rN(max = 200, min = 0) {
    return Math.floor(Math.random() * max + min);
  }
  static choice(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  static range(minVal) {
    return Math.random() * minVal;
  }

  static PosOrMinusRange(minVal) {
    return (Math.random() - 0.5) * minVal * 2;
  }
  static randomBool(){
    return Math.round(Math.random()) == 1
  }
}
