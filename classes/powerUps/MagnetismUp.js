class MagnetismUp extends PowerUp {
    constructor(x, y, scene) {
        super(x, y, scene);
        // this.icon = loadImage("assets/placeholder-icon.png"); // TODO: find asset
    }

    onCollected() {
        if(!this.plrCollected.hasMagnetismPowerUp) {
            this.plrCollected.hasMagnetismPowerUp = true; // make magnetism stronger
        } else {
            return(-1);
        }
    }

    onFinished() {
        this.plrCollected.hasMagnetismPowerUp = false;; // revert
        this.effectActive = false;
        return(-1);
    }
}