// ABSTRACT
class GameElement {
  constructor() {
    if(this.constructor === GameElement) {
      throw new TypeError("GameElement cannot be instantiated directly");
    }
    
    if(this.update == undefined) {
      throw new TypeError("Children of GameElement must implement update()");
    }
    
    if(this.drawElement == undefined) {
      throw new TypeError("Children of GameElement must implement drawElement()");
    }
  }
}