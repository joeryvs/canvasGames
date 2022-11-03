
function cijfer(points,maxPoints,gokkans,hallmark) {
    return( (points - gokkans) / (maxPoints - gokkans)) * (hallmark / 100);
}