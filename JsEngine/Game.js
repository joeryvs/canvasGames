const canvv = document.querySelector("canvas");
const can = canvv.getContext("2d");

class Game {
  constructor({ getContext }) {
    this.can = getContext("2d");
    this.gameManeger = new GameStateMangeger();
  }
  Run() {
    this.Start();
    this.loop();
  }
  loop() {
    requestAnimationFrame(this.loop);
    this.Update();
    this.Draw();
  }
  Start() {}
  Update() {
    this.gameManeger.HandleInput();
    this.gameManeger.Update();
  }
  Draw(canvas) {
    canvas.clearRect(0, 0, 100, 100);

    this.gameManeger.Draw();
  }
}
