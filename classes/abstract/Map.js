// ABSTRACT
class Map {
  constructor() {
    if(this.constructor === Map) {
      throw new TypeError("Map cannot be instantiated directly");
    }
    
    if(this.addElements === undefined) {
      throw new TypeError('Classes extending the abstract class "Map" must contain "addElements()"');
    }
    
    if(this.getPowerUpLoc === undefined) {
      throw new TypeError('Classes extending the abstract class "Map" must contain "getPowerUpLoc()"');
    }
  } 
}