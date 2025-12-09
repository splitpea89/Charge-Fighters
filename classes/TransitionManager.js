class TransitionManager {
    constructor(scene) {
        this.active = false;
        this.progress = 0;        // 0 → 1
        this.speed = 0.02;        // slide speed
        this.shakeTime = 0;
        this.shakeDuration = 67;
        this.onComplete = null;
        this.scene = scene;
    }

    start(callback) {
        this.active = true;
        this.progress = 0;
        this.shakeTime = 0;
        this.onComplete = callback;
    }

    update() {
        if (!this.active) return;

        // Slide panels
        this.progress += (this.speed * (1 + this.progress)**2);

        // Trigger shake on collision
        if (this.progress >= 1 && this.shakeTime === 0) {
            this.shakeTime = this.shakeDuration;
            this.scene.audioController.playScreenTransitionSound();
            if (this.onComplete) this.onComplete();
        }

        // End transition
        if (this.shakeTime > 0) {
            this.shakeTime--;
            if (this.shakeTime === 0) {
                this.active = false;
            }
        }
    }

    draw() {
        if (!this.active) return;

        // SCREEN SHAKE
        if (this.shakeTime > 0) {
            let intensity = 5 * (this.shakeTime/this.shakeDuration);
            translate(random(-intensity, intensity), random(-intensity, intensity));
        }

        // How far each panel has moved
        let slide = constrain(this.progress, 0, 1) * (300);

        // LEFT RED + PANEL
        strokeWeight(2);
        fill(255, 0, 0);
        rect(-300 + slide, 300, 600, 600);

        // Red "+"
        stroke(255);
        strokeWeight(20);
        line(-120+slide, 300, -180+slide, 300);
        line(-150+slide, 270, -150+slide, 330);

        // RIGHT BLUE – PANEL
        strokeWeight(2);
        stroke(0);
        fill(0, 100, 255);
        rect(900-slide, 300, 600, 600);

        // Blue "–"
        stroke(255);
        strokeWeight(20);
        line(780 - slide, 300, 720 - slide, 300);
    }
}
