function cijfer(points = 100, maxPoints = 100, gokkans = 0, hallmark = 55) {
  return ((points - gokkans) / (maxPoints - gokkans)) * (hallmark / 55);
}
