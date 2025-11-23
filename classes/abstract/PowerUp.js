// ABSTRACT
class PowerUp {
  constructor() {
    if(this.constructor === PowerUp) {
      throw new TypeError("PowerUp cannot be instantiated directly");
    }
    
    if(this.update === undefined) {
      throw new TypeError('Classes extending the abstract class "PowerUp" must contain "update()"');
    }
    
    if(this.drawElement === undefined) {
      throw new TypeError('Classes extending the abstract class "PowerUp" must contain "drawElement()"');
    }
  } 
}