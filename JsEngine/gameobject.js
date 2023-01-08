class GameObject {
  constructor() {}
  Draw({getContext}) {
    const canv = getContext();
    
  }
  HandleInput() {}
  Update() {}
}

class TextGameObject extends GameObject {
    constructor(){

    }
}
class SpriteGameObject extends GameObject{
    constructor(){}
}
class GameObjectList extends GameObject{
    constructor(){
        this.children = [];
    }
    Draw(){
        this.children.forEach( (child) => child.Draw);
    }
    Update(){
        for (const iterator of this.children) {
            iterator.Update();
        }
    }
    HandleInput(){
        for (const child of this.children) {
            child.HandleInput();
        }
    }
}