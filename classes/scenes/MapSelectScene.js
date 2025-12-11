class MapSelectScene extends Scene {
  constructor(audioController) {
    super();
    this.audioController = audioController;
    this.UIElements = [];
    this.maps = [Practice_Range, Polka_Dots, Pillars, Charge_Chamber]; //array of maps in rotation
    this.mapImgs = [];
    this.currentIx = 0;
    this.imgIcon = new ImgIcon(300, 200, 110, 110, 0, icon);
    this.mapLabel = new TextBox(300, 110, 200, 20, 0, "Map: " + this.maps[0].name.replaceAll("_", " "), 15, color(0, 0, 0, 0), color(225));
    this.returnScene = false;
    this.backToMain = false;
    this.roundsToWin = 3;
  }
  
  init() {
    console.log("init select scene");

    this.onButton = loadImage("assets/OnButton.png");
    this.offButton = loadImage("assets/OffButton.png");
    
    this.doubleJumpIcon = loadImage("assets/DoubleJumpIcon.png");
    this.jumpHeightIcon = loadImage("assets/JumpHeightIcon.png");
    this.spikedBodyIcon = loadImage("assets/SpikedBodyIcon.png");
    this.magnetismUpIcon = loadImage("assets/MagnetismUpIcon.png");
    
    for (let i in this.maps) {
        let map = new this.maps[i]();
        loadImage(
            map.imgPath,

            // on success
            img => this.mapImgs[i] = img,

            // on failure
            err => {
                console.log("Failed to load image:", map.name.replaceAll("_", " "), err);
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
    append(this.UIElements, new TextBox(140, 330, 300, 40, 0, "Map Randomization: ", 20, color(0, 0, 0, 0), color(225), 0));
    this.isRandomizedButton = new ImgButton(275, 330, 60, 60, this.onButton, this.offButton, () => this.randomizedButtonPressed(), false);
    append(this.UIElements, this.isRandomizedButton);
    append(this.UIElements, new TextBox(120, 400, 300, 40, 0, "Rounds to Win: ", 20, color(0, 0, 0, 0), color(225), 0));
    this.roundsToWinTextBox = new TextBox(272, 400, 60, 30, 0, this.roundsToWin, 25, color(0, 0, 0, 0), color(225), 0);
    append(this.UIElements, this.roundsToWinTextBox);
    append(this.UIElements, new ImgButton(245, 400, 60, 60, loadImage("assets/LeftArrow.png"), undefined, () => this.roundCountScrollLeft()));
    append(this.UIElements, new ImgButton(300, 400, 60, 60, loadImage("assets/RightArrow.png"), undefined, () => this.roundCountScrollRight()));
    append(this.UIElements, new TextBox(460, 300, 300, 40, 0, "Powerup Pool: ", 20, color(0, 0, 0, 0), color(225), 0));
    // DoubleJump
    this.doubleJumpToggle = new ImgButton(420, 340, 40, 40, this.doubleJumpIcon, this.doubleJumpIcon, undefined, true, true);
    append(this.UIElements, this.doubleJumpToggle);
    // MagnetismUp
    this.magnetismUpToggle = new ImgButton(485, 340, 40, 40, this.magnetismUpIcon, this.magnetismUpIcon, undefined, true, true);
    append(this.UIElements, this.magnetismUpToggle);
    // JumpHeight
    this.jumpHeightToggle = new ImgButton(420, 405, 40, 40, this.jumpHeightIcon, this.jumpHeightIcon, undefined, true, true);
    append(this.UIElements, this.jumpHeightToggle);
    // SpikedBody
    this.spikedBodyToggle = new ImgButton(485, 405, 40, 40, this.spikedBodyIcon, this.spikedBodyIcon, undefined, true, true);
    append(this.UIElements, this.spikedBodyToggle);

  }

  randomizedButtonPressed() {
    if(this.isRandomizedButton.state == false) {
      this.mapLabel.txt = "Map: ???";
    } else {
      this.mapLabel.txt = "Map: " + this.maps[this.currentIx].name.replaceAll("_", " ");
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

    updateAndDrawElements(this.UIElements, true, this);

    if(this.returnScene) {
        let powerups = [];
        if(this.spikedBodyToggle.state) {append(powerups, SpikedBody);}
        if(this.magnetismUpToggle.state) {append(powerups, MagnetismUp);}
        if(this.doubleJumpToggle.state) {append(powerups, DoubleJump);}
        if(this.jumpHeightToggle.state) {append(powerups, JumpHeightUp);}

        console.log(powerups);

        if(this.isRandomizedButton.state == false) {
          return(new GameScene(new this.maps[this.currentIx](), this.roundsToWin, false, this.maps, this.audioController, powerups));
        } else {
          return(new GameScene(new (random(this.maps))(), this.roundsToWin, true, this.maps, this.audioController, powerups));
        }
    }

    if(this.backToMain) {
        return(new TitleScene(this.audioController));
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
      this.mapLabel.txt = "Map: " + this.maps[this.currentIx].name.replaceAll("_", " ");
    }
  }

  mapScrollRight() {
    if(this.isRandomizedButton.state == false) {
      if(this.currentIx == this.maps.length - 1) {
          this.currentIx = 0;
      } else {
          this.currentIx++;
      }
      this.mapLabel.txt = "Map: " + this.maps[this.currentIx].name.replaceAll("_", " ");
    }
  }

  drawBackground() {
    background(0);

  strokeWeight(0);
    for(let i = 0; i < 600; i+=10) {
      fill((255 - (i * 255 / 600))/1.5, 0, 50 + (i * 255 / 600));
      rect(300, i+300, 600, 600);
    }

    // fill(150);
    // rect(300, 300, 570, 570);
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