class Charge_Chamber extends Map {
    constructor() {
        super();
        this.p1SpawnX = 120;
        this.p1SpawnY = 540;
        this.p2SpawnX = 480;
        this.p2SpawnY = 540;
        this.mapName = "Charge Chamber";
        this.imgPath = "assets/Charge_Chamber.png";
        this.openPowerUpLocs = [
            [300, 120],
            [300, 455]
        ];
        this.filledPowerUpLocs = [];
    }

    addElements(platforms, spikes, polarElements) {

        // Borders
        append(platforms, new Platform(10, 300, 20, 600, 0));
        append(platforms, new Platform(590, 300, 20, 600, 0));
        append(platforms, new Platform(300, 10, 600, 20, 0));

        // Ground platforms
        append(platforms, new Platform(120, 560, 140, 20, 0));
        append(platforms, new Platform(480, 560, 140, 20, 0));
        append(platforms, new Platform(300, 560, 140, 20, 0));

        // Crossing polarity pair
        let pL = new Platform(200, 300, 160, 20, 1);
        let pR = new Platform(400, 300, 160, 20, -1);

        append(platforms, pL);
        append(platforms, pR);
        append(polarElements, pL);
        append(polarElements, pR);

        // spike platform
        append(platforms, new Platform(300, 410, 120, 45, 0));

        // Raised side platforms
        append(platforms, new Platform(120, 180, 120, 20, 0));
        append(platforms, new Platform(480, 180, 120, 20, 0));

        append(spikes, new Spikes(300, 438, 120, 15, 4, 0, 2, color(255)));
        append(spikes, new Spikes(300, 382, 120, 15, 4, 0, 0, color(255)));
        
    }
}