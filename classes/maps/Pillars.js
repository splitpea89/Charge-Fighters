class Pillars extends Map {
    constructor() {
        super();
        this.p1SpawnX = 120;
        this.p1SpawnY = 240;
        this.p2SpawnX = 480;
        this.p2SpawnY = 240;
        this.name = "Pillars";
        this.imgPath = "assets/placeholder-icon.png";
        this.openPowerUpLocs = [[300, 80], [300, 200]];
        this.filledPowerUpLocs = [];
    }

    addElements(platformsArr, spikesArr, polarElementsArr) {
        let wall1 = new Platform(590, 300, 20, 600, 0);
        let wall2 = new Platform(10, 300, 20, 600, 0);
        let wall3 = new Platform(300, 10, 600, 20, 0);

        append(platformsArr, wall1); // walls
        append(platformsArr, wall2);
        append(platformsArr, wall3);

        let wallSpikes1 = new Spikes(28, 330, 15, 580, 50, 0, 1, color(200));
        let wallSpikes2 = new Spikes(300, 28, 560, 15, 50, 0, 2, color(200));
        let wallSpikes3 = new Spikes(572, 330, 15, 580, 50, 0, 3, color(200));

        append(spikesArr, wallSpikes1);
        append(spikesArr, wallSpikes2);
        append(spikesArr, wallSpikes3);

        let spawn1 = new Platform(120, 270, 40, 15, 0);
        let spawn2 = new Platform(480, 270, 40, 15, 0);
        append(platformsArr, spawn1);
        append(platformsArr, spawn2);

        let pillar1 = new Platform(120, 110, 15, 100, 1, true, [120, 110, 480, 110, 500, 1]);
        let pillar2 = new Platform(480, 400, 15, 100, -1, true, [120, 400, 480, 400, 500, 2]);
        append(platformsArr, pillar1);
        append(platformsArr, pillar2);
        append(polarElementsArr, pillar1);
        append(polarElementsArr, pillar2);

        append(platformsArr, new Platform(300, 270, 15, 80, 0));
        append(platformsArr, new Platform(120, 520, 15, 80, 0));
        append(platformsArr, new Platform(480, 520, 15, 80, 0));
 

    }

}