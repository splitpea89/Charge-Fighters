class SpikedBody extends PowerUp {
    constructor(x, y, scene) {
        super(x, y, scene);
        // this.icon = loadImage("assets/placeholder-icon.png"); // TODO: find asset
    }

    onCollected() {
        if(!this.plrCollected.hasSpikedBody){
            this.plrCollected.hasSpikedBody = true; // give double jump
        } else {
            return(-1);
        }
    }

    onFinished() {
        this.plrCollected.hasSpikedBody = false; // revert
        this.effectActive = false;
        return(-1);
    }
}