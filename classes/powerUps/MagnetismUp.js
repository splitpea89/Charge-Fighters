class MagnetismUp extends PowerUp {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.plrCollected = undefined;
        this.effectActive = false;
        this.effectTime = 500;
        this.icon = loadImage("assets/placeholder-icon.png"); // TODO: find asset
    }

    update() {
        if(this.plrCollected != undefined) {
            this.effectTime--;
            console.log(this.effectTime);
            if(!this.effectActive) {
                this.effectActive = true;
                this.plrCollected.hasMagnetismPowerUp = true; // make magnetism stronger
            }
        }

        if(this.effectTime <= 0 && this.effectActive) {
            this.plrCollected.hasMagnetismPowerUp = false;; // revert
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