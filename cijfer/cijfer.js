function cijfer(points = 100, maxPoints = 100, gokkans = 0, hallmark = 55) {
  return ((points - gokkans) / (maxPoints - gokkans)) * (hallmark / 50);
}

class CijferBerekenen {
  constructor({ points, maxPoints, gokkans = 0, hallmark = 50 }) {
    this.punten = points;
    this.maxPoints = maxPoints;
    this.gokkans = gokkans;
    this.hallmark = hallmark;
  }
  cijfer() {
    const ans = ((this.punten - this.gokkans) / (this.maxPoints - this.gokkans)) * (55 / this.hallmark);
    if (ans > 1) return 1;
    if (ans < 0) return 0;
    return ans;
  }
  canvasCors({ height, width }) {
    const w = width;
    const h = height;
    const ans = {};
    ans.x = (this.punten / this.maxPoints) * w;
    const cijf = this.cijfer();
    ans.y = h - h * cijf;
    return ans;
  }
}
