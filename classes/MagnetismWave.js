class MagnetismWave {
    constructor(parent, intensity, lifetime) {
        this.parent = parent;
        this.intensity = intensity;
        if(this.parent.hasMagnetismPowerUp) {this.intensity *= 2;}
        this.lifetime = lifetime;
        this.timeStarted = millis();
        this.startingAlpha = 150;
    }

    update() {
        if(millis() - this.timeStarted > this.lifetime) {
            return(-1);
        }
    }

    drawElement() {
        let t = millis() - this.timeStarted;
        stroke(50 + (this.parent.pol * 100), 50 - abs(this.parent.pol*25), 50 - (this.parent.pol * 100), (1 - t/this.lifetime) * this.startingAlpha);
        strokeWeight(2.5);
        noFill();
        ellipse(this.parent.x, this.parent.y, 20 + t/(40/this.intensity), 20 + t/(40/this.intensity));

    }
}