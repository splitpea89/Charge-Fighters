// ABSTRACT
class PowerUp {
  constructor(x, y, scene) {

    this.x = x;
    this.y = y;
    this.scene = scene;
    this.plrCollected = undefined;
    this.effectActive = false;
    this.effectTime = 500;
    this.icon = loadImage("assets/placeholder-icon.png");
    this.size = 30;

    if(this.constructor === PowerUp) {
      throw new TypeError("PowerUp cannot be instantiated directly");
    }
    
    if(this.onCollected === undefined) {
      throw new TypeError('Classes extending the abstract class "PowerUp" must contain "onCollected()"');
    }

    if(this.onFinished === undefined) {
      throw new TypeError('Classes extending the abstract class "PowerUp" must contain "onFinished()"');
    }
  } 

  update() {
        if(this.plrCollected != undefined) {
            this.effectTime--;
            if(!this.effectActive) {
                this.effectActive = true;
                let newTakenSpawns = this.scene.map.filledPowerUpLocs.filter(loc => loc != [this.x, this.y]);
                append(this.scene.map.openPowerUpLocs, [this.x, this.y]);
                return(this.onCollected());
            }
        }

        if(this.effectTime <= 0 && this.effectActive) {
            return(this.onFinished());
        }
    }

    drawElement() {
        if(this.plrCollected == undefined) {
            image(this.icon, this.x-(this.size/2), this.y - (this.size/2) + 5 * sin(frameCount/40), this.size, this.size);
        }
    }

}