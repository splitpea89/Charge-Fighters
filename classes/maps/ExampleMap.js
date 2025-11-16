class ExampleMap extends Map {
    constructor() {
        super();
        this.p1SpawnX = 90;
        this.p1SpawnY = 460;
        this.p2SpawnX = 510;
        this.p2SpawnY = 460;
        this.name = "Example Map";
        this.imgPath = "assets/ExampleMap.png";
    }

    addElements(platformsArr, polarElementsArr) {
        append(platformsArr, new Platform(590, 300, 20, 600, 0));
        append(platformsArr, new Platform(10, 300, 20, 600, 0));
        append(platformsArr, new Platform(300, 10, 600, 20, 0));

        append(platformsArr, new Platform(490, 500, 100, 20, 0));
        append(platformsArr, new Platform(110, 500, 100, 20, 0));
        append(platformsArr, new Platform(110, 325, 100, 20, 0));
        append(platformsArr, new Platform(490, 325, 100, 20, 0));
        append(platformsArr, new Platform(90, 150, 100, 20, 0, true, [20, 150, 250, 150, 300, 1]));
        append(platformsArr, new Platform(510, 150, 100, 20, 0, true, [350, 150, 580, 150, 300, 2]));
        append(platformsArr, new Platform(200, 560, 100, 20, 0, true, [200, 560, 400, 560, 300, 1])); 
        let p1 = new Platform(300, 250, 100, 20,-1);
        let p2 = new Platform(300, 400, 100, 20, 1);
        append(platformsArr, p1);
        append(platformsArr, p2);
        append(polarElementsArr, p1);
        append(polarElementsArr, p2);
    }

    getPowerUpLoc() {

    }
}