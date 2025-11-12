class GameScene extends Scene {
  constructor() {
    super();
    this.platforms = [];
    this.polarElements = [];
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
    let p1 = new Platform(300, 250, 100, 15,-1);
    let p2 = new Platform(300, 400, 100, 15, 1);
    append(this.platforms, p1);
    append(this.platforms, p2);
    append(this.platforms, new Platform(300, 560, 600, 15, 0)); // temp floor
    append(this.polarElements, p1);
    append(this.polarElements, p2);
    } // create Platform objects
    
  }
  
  runLoop(dT) {
    this.drawArena();
    updateAndDrawElements(this.platforms);
    updateAndDrawPlayers(this.plr1, this.plr2, this);
    Particle.updateAndDrawParticles(this.plr1.activeParticles);
    Particle.updateAndDrawParticles(this.plr2.activeParticles);
  }
  
  drawArena() {
    // TODO: design
    background(10);
    fill(160);
    rect(300, 300, 550, 550);
    
  }
}