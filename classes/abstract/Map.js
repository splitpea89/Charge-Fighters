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

  getPowerUpLoc() {
        if(this.openPowerUpLocs.length == 0) {return -1;}
        let loc = random(this.openPowerUpLocs);
        this.openPowerUpLocs.splice(this.openPowerUpLocs.indexOf(loc), 1);
        append(this.filledPowerUpLocs, loc);
        return loc;
    }

    resetPowerUps() {
        for(let i in this.filledPowerUpLocs) {
            append(this.openPowerUpLocs, this.filledPowerUpLocs[i]);
        }
        this.filledPowerUpLocs = [];
    }
}