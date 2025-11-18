class ExampleMap extends Map {
    constructor() {
        super();
        this.p1SpawnX = 110;
        this.p1SpawnY = 460;
        this.p2SpawnX = 490;
        this.p2SpawnY = 460;
        this.name = "Example Map";
        this.imgPath = "assets/ExampleMap.png";
    }

    addElements(platformsArr, spikesArr, polarElementsArr) {
        append(platformsArr, new Platform(590, 300, 20, 600, 0)); // walls
        append(platformsArr, new Platform(10, 300, 20, 600, 0));
        append(platformsArr, new Platform(300, 10, 600, 20, 0));

        append(platformsArr, new Platform(470, 500, 100, 20, 0));
        append(platformsArr, new Platform(130, 500, 100, 20, 0));
        append(platformsArr, new Platform(130, 325, 100, 20, 0));
        append(platformsArr, new Platform(470, 325, 100, 20, 0));
        append(platformsArr, new Platform(110, 150, 100, 20, 0, true, [20, 150, 250, 150, 300, 1]));
        append(platformsArr, new Platform(490, 150, 100, 20, 0, true, [350, 150, 580, 150, 300, 2]));
        append(platformsArr, new Platform(200, 560, 100, 20, 0, true, [200, 560, 400, 560, 300, 1])); 
        let p1 = new Platform(300, 250, 100, 20,-1);
        let p2 = new Platform(300, 400, 100, 20, 1);
        append(platformsArr, p1);
        append(platformsArr, p2);
        append(polarElementsArr, p1);
        append(polarElementsArr, p2);

        append(spikesArr, new Spikes(28, 200, 15, 50, 5, 0, 1, color(255)));
        append(spikesArr, new Spikes(572, 200, 15, 50, 5, 0, 3, color(255)));
    }

    getPowerUpLoc() {

    }
}