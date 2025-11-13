class GameScene extends Scene {
  constructor() {
    super();
    this.platforms = [];
    this.polarElements = [];
    this.activated = false;
    this.justStarted = true;
    this.justEnded = true;
    this.startTime = millis();
    this.paused = false;
    this.score1 = 0;
    this.score2 = 0;
  }
  
  init() {
    background(10);
    console.log("init game scene");
    
    this.plr1 = new Player(90, 460, 1, 1);
    this.plr2 = new Player(510, 460, 1, 2);

    append(this.polarElements, this.plr1);
    append(this.polarElements, this.plr2);

    {
    append(this.platforms, new Platform(90, 500, 100, 15, 0));
    append(this.platforms, new Platform(510, 500, 100, 15, 0));
    append(this.platforms, new Platform(90, 325, 100, 15, 0));
    append(this.platforms, new Platform(510, 325, 100, 15, 0));
    append(this.platforms, new Platform(90, 150, 100, 15, 0));
    append(this.platforms, new Platform(510, 150, 100, 15, 0));
    append(this.platforms, new Platform(300, 560, 200, 15, 0)); 
    let p1 = new Platform(300, 250, 100, 15,-1);
    let p2 = new Platform(300, 400, 100, 15, 1);
    append(this.platforms, p1);
    append(this.platforms, p2);
    append(this.polarElements, p1);
    append(this.polarElements, p2);
    } // create Platform objects
    
  }
  
  runLoop(dT) {
    this.drawArena();
    
    updateAndDrawElements(this.platforms, this.activated);
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
    } else if (this.paused) {
      // TODO: pause menu
    }
  }
  
  drawArena() {
    // TODO: design
    background(10);
    fill(160);
    strokeWeight(0);
    rect(300, 300, 585, 585);
    
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
    }
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
      textSize(60+5*sin(t/1000));
      fill(250);
      text(str(txt), 300, 200);
      text(str(this.score1) + "     -     " + str(this.score2), 300, 350);
      textSize(40);
      text("restarting in: " + str(Math.ceil(t/1000)), 300, 500)
    } else {
      this.plr1.isAlive = true;
      this.plr2.isAlive = true;
      this.plr1.x = 90;
      this.plr1.y = 460;
      this.plr2.x = 510;
      this.plr2.y = 460;
      this.justEnded = true;
    }
  }
}