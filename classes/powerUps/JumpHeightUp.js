class JumpHeightUp extends PowerUp {
    constructor(x, y, scene) {
        super(x, y, scene);
        // this.icon = loadImage("assets/placeholder-icon.png"); // TODO: find asset
    }

    onCollected() {
        if(!this.plrCollected.hasJumpHeightPowerUp){
            this.plrCollected.hasJumpHeightPowerUp = true; // give jump height
        } else {
            return(-1);
        }
    }

    onFinished() {
        this.plrCollected.hasJumpHeightPowerUp = false; // revert
        this.effectActive = false;
        return(-1);
    }
}