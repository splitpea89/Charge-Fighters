class DoubleJump extends PowerUp {
    constructor(x, y, scene) {
        super();
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.plrCollected = undefined;
        this.effectActive = false;
        this.effectTime = 500;
        this.icon = loadImage("assets/placeholder-icon.png"); // TODO: find asset
    }

    update() {
        if(this.plrCollected != undefined) {
            this.effectTime--;
            if(!this.effectActive) {
                this.effectActive = true;
                this.scene.map.openPowerUpLocs = this.scene.map.filledPowerUpLocs.filter(loc => loc != [this.x, this.y]);
                append(this.scene.map.openPowerUpLocs, [this.x, this.y]);
                if(!this.plrCollected.hasDoubleJumpPowerUp){
                    this.plrCollected.hasDoubleJumpPowerUp = true; // give double jump
                } else {
                    return(-1);
                }
            }
        }

        if(this.effectTime <= 0 && this.effectActive) {
            this.plrCollected.hasDoubleJumpPowerUp = false;; // revert
            this.effectActive = false;
            return(-1);
        }
    }

    drawElement() {
        if(this.plrCollected == undefined) {
            image(this.icon, this.x, this.y + 5 * sin(frameCount/40), 15, 15);
        }
    }
}