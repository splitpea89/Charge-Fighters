class GameScene extends Scene {
  constructor(map) {
    super();
    this.platforms = [];
    this.spikes = [];
    this.polarElements = [];
    this.UIElements = [];
    this.activated = false;
    this.justStarted = true;
    this.justEnded = true;
    this.startTime = millis();
    this.paused = false;
    this.timeBeforeFieldShrink = 5000;
    this.fieldSize = 600;
    this.score1 = 0;
    this.score2 = 0;
    this.exit = false;
    this.map = map;
  }
  
  init() {
    background(10);
    console.log("init game scene");
    
    this.plr1 = new Player(this.map.p1SpawnX, this.map.p1SpawnY, 1, 1);
    this.plr2 = new Player(this.map.p2SpawnX, this.map.p2SpawnY, 1, 2);

    append(this.polarElements, this.plr1);
    append(this.polarElements, this.plr2);

    this.map.addElements(this.platforms, this.spikes, this.polarElements);
    // create objects
    
  }
  
  runLoop(dT) {

    if(millis() - this.startTime > this.timeBeforeFieldShrink) {
      this.fieldSize -= dT/400;
    }

    this.drawArena();
    
    updateAndDrawElements(this.platforms, this.activated && !this.paused);
    updateAndDrawElements(this.spikes, this.activated && !this.paused);
    updateAndDrawPlayers(this.plr1, this.plr2, this.activated, this);
    if(!this.plr1.isAlive || !this.plr2.isAlive) {
      if(this.justEnded == true) {
        this.justEnded = false;
        this.startTime = millis();
      }
      this.doWinSequence();
    }
    Particle.updateAndDrawParticles(this.plr1.activeParticles);
    Particle.updateAndDrawParticles(this.plr2.activeParticles);

    if(this.justStarted) {
      this.drawStartCountdown();
    } else {
      if(keyIsDown(27) && !this.paused) {
        this.paused = true;
        append(this.UIElements, new RectButton(300, 250, 150, 50, 10, color(0, 110, 150), color(0, 50, 100), "Continue", 20, 255, () => {this.paused = false; this.UIElements = [];})); // looked up how to pass functions, this syntax passes an inline function while automatically binding "this" to current instance of GameScene
        append(this.UIElements, new RectButton(300, 400, 150, 50, 10, color(0, 110, 150), color(0, 50, 100), "Exit", 20, 255, () => {this.exit = true;}));
      }
      if (this.paused) {
      // TODO: pause menu
      this.drawPauseMenu();
      }
    }

    updateAndDrawElements(this.UIElements, true);

    if(this.exit) {return new TitleScene;}
  }
  
  drawArena() {
    // TODO: design
    background(200, 0, 0);
    fill(160);
    strokeWeight(0);
    rect(300, 300, this.fieldSize, this.fieldSize);
    
  }

  drawStartCountdown() {
    let t = 3000 - (millis() - this.startTime);
    if(t > 0) {
      fill(0, 0, 0, 120);
      rect(300, 300, 600, 600);
      textSize(60+(t%1000)/100);
      fill(250);
      text(Math.ceil(t/1000), 300, 300);
    } else {
      this.activated = true;
      this.justStarted = false;
      this.startTime = millis();
    }
  }

  drawPauseMenu() {
    fill(0, 0, 0, 120);
    rect(300, 300, 600, 600);
  }

  doWinSequence() { // startTime is set to the time when round ended
    let txt;
    if(!this.plr1.isAlive && !this.plr2.isAlive) {
      txt = "Tie!";
    } else if(!this.plr1.isAlive) {
      txt = "Player 2 Wins!";
    } else if(!this.plr2.isAlive) {
      txt = "Player 1 Wins!";
    }
    let t = 3000 - (millis() - this.startTime);
    if(t > 0) {
      fill(0, 0, 0, 120);
      rect(300, 300, 600, 600);
      strokeWeight(3);
      stroke(0);
      textSize(50+5*sin(t/1000));
      fill(250);
      text(str(txt), 300, 200);
      text(str(this.score1) + "     -     " + str(this.score2), 300, 350);
      textSize(35);
      text("restarting in: " + str(Math.ceil(t/1000)), 300, 500)
    } else {
      this.plr1.isAlive = true;
      this.plr2.isAlive = true;
      this.plr1.x = 90;
      this.plr1.y = 460;
      this.plr1.vX = 0;
      this.plr1.vY = 0;
      this.plr2.x = 510;
      this.plr2.y = 460;
      this.plr2.vX = 0;
      this.plr2.vY = 0;
      this.justEnded = true;
      this.startTime = millis();
      this.fieldSize = 600;
    }
  }
}