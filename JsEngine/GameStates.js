class GameState {
  Draw() {}
  Update() {}
  HandleInput() {}
}

class GameStateMangeger {
  constructor() {
    this.maneger = {};
    this.currentState = null;
  }
  AddGameState(id, GameState) {
    this.maneger[id] = GameState;
  }
  SwitchGameState(id) {
    this.currentState = this.maneger[id];
  }
  Draw() {
    if (this.currentState != null) {
      this.currentState.Draw();
    }
  }
  Update() {
    if (this.currentState != null) {
      this.currentState.Update();
    }
  }
  HandleInput() {
    if (this.currentState != null) {
      this.currentState.HandleInput();
    }
  }
}
