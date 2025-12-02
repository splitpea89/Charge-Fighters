class MapSelectScene extends Scene {
  constructor(map) {
    super();
    this.UIElements = [];
    this.maps = [ExampleMap, PolkaDots, Pillars]; //array of maps in rotation
    this.mapImgs = [];
    this.currentIx = 0;
    this.imgIcon = new ImgIcon(300, 200, 110, 110, 0, icon);
    this.mapLabel = new TextBox(300, 110, 200, 20, 0, this.maps[0].name, 15, color(0, 0, 0, 0), color(20));
    this.returnScene = false;
    this.backToMain = false;
    this.roundsToWin = 3;
  }
  
  init() {
    console.log("init select scene");

    this.onButton = loadImage("assets/OnButton.png");
    this.offButton = loadImage("assets/OffButton.png");
    
    for (let i in this.maps) {
        let map = new this.maps[i]();
        loadImage(
            map.imgPath,

            // on success
            img => this.mapImgs[i] = img,

            // on failure
            err => {
                console.log("Failed to load image:", map.name, err);
                this.mapImgs.push(icon);
            }
        );
    }


    append(this.UIElements, this.imgIcon);
    append(this.UIElements, this.mapLabel);
    append(this.UIElements, new ImgButton(220, 200, 100, 100, loadImage("assets/LeftArrow.png"), undefined, () => this.mapScrollLeft()));
    append(this.UIElements, new ImgButton(380, 200, 100, 100, loadImage("assets/RightArrow.png"), undefined, () => this.mapScrollRight()));
    append(this.UIElements, new RectButton(420, 520, 120, 60, 10, color(20, 130, 200), color(0, 50, 100), "Start", 15, color(255), () => {this.returnScene = true;}));
    append(this.UIElements, new RectButton(180, 520, 120, 60, 10, color(20, 130, 200), color(0, 50, 100), "Exit", 15, color(255), () => {this.backToMain = true;}));
    append(this.UIElements, new TextBox(250, 330, 300, 40, 0, "Map Randomization: ", 20, color(0, 0, 0, 0), color(0), 0));
    this.isRandomizedButton = new ImgButton(385, 330, 60, 60, this.onButton, this.offButton, () => this.randomizedButtonPressed(), false);
    append(this.UIElements, this.isRandomizedButton);
    append(this.UIElements, new TextBox(250, 400, 300, 40, 0, "Rounds to Win: ", 20, color(0, 0, 0, 0), color(0), 0));
    this.roundsToWinTextBox = new TextBox(400, 400, 60, 30, 0, this.roundsToWin, 25, color(0, 0, 0, 0), color(0), 0);
    append(this.UIElements, this.roundsToWinTextBox);
    append(this.UIElements, new ImgButton(370, 400, 60, 60, loadImage("assets/LeftArrow.png"), undefined, () => this.roundCountScrollLeft()));
    append(this.UIElements, new ImgButton(430, 400, 60, 60, loadImage("assets/RightArrow.png"), undefined, () => this.roundCountScrollRight()));
  }

  randomizedButtonPressed() {
    if(this.isRandomizedButton.state == false) {
      this.mapLabel.txt = "???";
    } else {
      this.mapLabel.txt = this.maps[this.currentIx].name;
    }
  }

  runLoop(dT) {
    this.drawBackground();

    if(this.isRandomizedButton.state == false) {

      if(this.mapImgs[this.currentIx] !== undefined) {
          this.imgIcon.img = this.mapImgs[this.currentIx];
      } else {
          this.imgIcon.img = icon;
      }

    } else {
      let counter = (frameCount / 20) % this.maps.length;
      if(this.mapImgs[floor(counter)] !== undefined) {
          this.imgIcon.img = this.mapImgs[floor(counter)];
      } else {
          this.imgIcon.img = icon;
      }
    }

    updateAndDrawElements(this.UIElements, true);

    if(this.returnScene) {
        if(this.isRandomizedButton.state == false) {
          return(new GameScene(new this.maps[this.currentIx](), this.roundsToWin, false, this.maps));
        } else {
          return(new GameScene(new (random(this.maps))(), this.roundsToWin, true, this.maps));
        }
    }

    if(this.backToMain) {
        return(new TitleScene());
    }
  }
  
  roundCountScrollLeft() {
    if(this.roundsToWin > 1) {
      this.roundsToWin--;
      this.roundsToWinTextBox.txt = this.roundsToWin;
    }
  }

  roundCountScrollRight() {
if(this.roundsToWin < 67) {
      this.roundsToWin++;
      this.roundsToWinTextBox.txt = this.roundsToWin;
    }
  }

  mapScrollLeft() {
    if(this.isRandomizedButton.state == false) {
      if(this.currentIx == 0) {
          this.currentIx = this.maps.length - 1;
      } else {
          this.currentIx--;
      }
      this.mapLabel.txt = this.maps[this.currentIx].name;
    }
  }

  mapScrollRight() {
    if(this.isRandomizedButton.state == false) {
      if(this.currentIx == this.maps.length - 1) {
          this.currentIx = 0;
      } else {
          this.currentIx++;
      }
      this.mapLabel.txt = this.maps[this.currentIx].name;
    }
  }

  drawBackground() {
    background(0);
    fill(150);
    rect(300, 300, 570, 570);
    fill(30);
    rect(300, 200, 120, 120);

    textSize(40 + 5*sin(frameCount/50));
    fill(100, 140, 220);
    strokeWeight(3);
    stroke(0);
    text("Game Options", 300, 60);


    strokeWeight(0);
  }

}