class MapSelectScene extends Scene {
  constructor(map) {
    super();
    this.UIElements = [];
    this.maps = [new ExampleMap()]; //array of maps in rotation
    this.mapImgs = [];
    this.currentIx = 0;
    this.imgIcon = new ImgIcon(300, 300, 110, 110, 0, icon);
    this.mapLabel = new TextBox(300, 210, 200, 20, 0, this.maps[0].name, 15, color(0, 0, 0, 0), color(20));
    this.returnScene = false;
    this.backToMain = false;
  }
  
  init() {
    console.log("init select scene");
    
    for (let map of this.maps) {
        loadImage(
            map.imgPath,

            // on success
            img => this.mapImgs.push(img),

            // on failure
            err => {
                console.log("Failed to load image:", map.name, err);
                this.mapImgs.push(icon);
            }
        );
    }


    append(this.UIElements, this.imgIcon);
    append(this.UIElements, this.mapLabel);
    append(this.UIElements, new ImgButton(200, 300, 70, 50, loadImage("assets/LeftArrow.png"), undefined, () => this.scrollLeft()));
    append(this.UIElements, new ImgButton(400, 300, 70, 50, loadImage("assets/RightArrow.png"), undefined, () => this.scrollRight()));
    append(this.UIElements, new RectButton(300, 420, 120, 60, 10, color(20, 130, 200), color(0, 50, 100), "Start", 15, color(255), () => {this.returnScene = true;}));
    append(this.UIElements, new RectButton(300, 520, 120, 60, 10, color(20, 130, 200), color(0, 50, 100), "Exit", 15, color(255), () => {this.backToMain = true;}));

  }
  
  runLoop(dT) {
    this.drawBackground();

    if(this.mapImgs[this.currentIx] !== undefined) {
        this.imgIcon.img = this.mapImgs[this.currentIx];
    } else {
        this.imgIcon.img = icon;
    }

    updateAndDrawElements(this.UIElements, true);

    if(this.returnScene) {
        return(new GameScene(this.maps[this.currentIx]));
    }

    if(this.backToMain) {
        return(new TitleScene());
    }
  }
  
  scrollLeft() {
    if(this.currentIx == 0) {
        this.currentIx = this.maps.length - 1;
    } else {
        this.currentIx--;
    }
    this.mapLabel.text = this.maps[this.currentIx].name;
  }

  scrollRight() {
    if(this.currentIx == this.maps.length - 1) {
        this.currentIx = 0;
    } else {
        this.currentIx++;
    }
    this.mapLabel.text = this.maps[this.currentIx].name;
  }

  drawBackground() {
    background(0);
    fill(150);
    rect(300, 300, 570, 570);
    fill(30);
    rect(300, 300, 120, 120);

    textSize(40 + 5*sin(frameCount/50));
    fill(100, 140, 220);
    strokeWeight(3);
    stroke(0);
    text("Map Select", 300, 160);


    strokeWeight(0);
  }

}