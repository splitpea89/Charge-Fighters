class PolkaDots extends Map {
    constructor() {
        super();
        this.p1SpawnX = 120;
        this.p1SpawnY = 240;
        this.p2SpawnX = 480;
        this.p2SpawnY = 240;
        this.name = "Polka Dots";
        this.imgPath = "assets/placeholder-icon.png";
    }

    addElements(platformsArr, spikesArr, polarElementsArr) {
        append(platformsArr, new Platform(590, 300, 20, 600, -1)); // walls
        append(platformsArr, new Platform(10, 300, 20, 600, -1));
        append(platformsArr, new Platform(300, 10, 600, 20, -1));
 
        let p1 = new Platform(120, 300, 80, 80, 1);
        let p2 = new Platform(200, 500, 80, 80, 1);
        let p3 = new Platform(300, 150, 80, 80, 1);
        let p4 = new Platform(400, 500, 80, 80, 1);
        let p5 = new Platform(480, 300, 80, 80, 1);
        append(platformsArr, p1);
        append(platformsArr, p2);
        append(platformsArr, p3);
        append(platformsArr, p4);
        append(platformsArr, p5);
        append(polarElementsArr, p1);
        append(polarElementsArr, p2);
        append(polarElementsArr, p3);
        append(polarElementsArr, p4);
        append(polarElementsArr, p5);

    }

    getPowerUpLoc() {

    }
}