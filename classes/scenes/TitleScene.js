class TitleScene extends Scene {
  constructor() {
    super();
    this.sceneElements = [];
    this.menuElements = [];
    this.activeMenu = -1; // "start", "options", "about"
    this.nextScene = 0;
  }
  
  init() {
    textAlign(CENTER);
    textStyle(BOLD);
    append(this.sceneElements, new LineMagnet(60, 300, 3.2, 2.8, 1, -0.05, 1.3));
    append(this.sceneElements, new LineMagnet(550, 250, 2.8, 3.2, 1, 0.05, 1.8));
    append(this.sceneElements, new LineMagnet(400, 540, 1.8, 3.2, 1, 0.08, 0.9)); // add line magnets
    
    this.volumeSlider = createSlider(0, 1, 0.75, 0);
    this.volumeSlider.position(-225, 300);
    this.volumeSlider.size(150, 20);
    this.SFXSlider = createSlider(0, 1, 0.75, 0);
    this.SFXSlider.position(-225, 375);
    this.SFXSlider.size(150, 20);
    
    this.startMenu();
  }
  
  startMenu() {
    if(this.activeMenu != 0) {
      this.menuElements = [];
      this.activeMenu = 0;
      this.volumeSlider.position(-225, 300);
      this.SFXSlider.position(-225, 375);
      append(this.menuElements, new RectButton(300, 237, 200, 75, 10, color(0, 100, 150), color(0, 50, 100), "START", 15, color(10), this.startGame.bind(this)));
      append(this.menuElements, new RectButton(300, 362, 200, 75, 10, color(0, 100, 150), color(0, 50, 100), "OPTIONS", 15, color(10), this.optionsMenu.bind(this)));
      append(this.menuElements, new RectButton(300, 487, 200, 75, 10, color(0, 100, 150), color(0, 50, 100), "ABOUT", 15, color(10), this.aboutMenu.bind(this)));
      console.log("start menu");
    }
  }
  
  optionsMenu() {
    if(this.activeMenu != 1) {
      this.menuElements = [];
      this.activeMenu = 1;
      this.volumeSlider.position(200, 300);
      this.SFXSlider.position(200, 375); // TODO: fix screen position
      
      append(this.menuElements, new ImgIcon(370, 302, 20, 20, 0, icon));
      append(this.menuElements, new ImgIcon(370, 377, 20, 20, 0, icon)); // TODO: sound functionality
      
      append(this.menuElements, new RectButton(300, 487, 200, 75, 10, color(0, 100, 150), color(0, 50, 100), "BACK", 15, color(10), this.startMenu.bind(this)));
      console.log("options menu");
    }
  }
  
  aboutMenu() {
    if(this.activeMenu != 2) {
      this.menuElements = [];
      this.activeMenu = 2;
      // create about menu
      
      append(this.menuElements, new TextBox(310, 225, 400, 230, 0, "Charge Fighters is a round-based platformer where players duel using magnetic polarity. \n\n" +
  "Switch charges to attract or repel opponents and interact with arena hazards. \n\n" +
  "Power-ups appear to give strategic advantages, and the arena grows more dangerous over time. \n\n" +
  "Score points by defeating opponents before the arena becomes too hazardous!", 15, color(50), color(220)));
      
      append(this.menuElements, new TextBox(150, 425, 250, 80, 0, "P1 Controls: \nMove: A and D\nJump/Wall Jump: W\nSwitch Polarity: S", 15, color(50), color(220)));
      append(this.menuElements, new TextBox(450, 425, 250, 80, 0, "P2 Controls: \nMove: Left Arrow and Right Arrow\nJump/Wall Jump: Up arrow\nSwitch Polarity: Down arrow", 15, color(50), color(220)));
      
      
      append(this.menuElements, new RectButton(300, 537, 200, 75, 10, color(0, 100, 150), color(0, 50, 100), "BACK", 15, color(10), this.startMenu.bind(this)));
    }
    console.log("about menu");
  }
  
  startGame() {
    console.log("start game") 
    this.nextScene = (new GameScene(new ExampleMap()));
  }
  
  runLoop(dT) {
    this.drawBackground();
  
    updateAndDrawElements(this.sceneElements, true);
    updateAndDrawElements(this.menuElements, true);
    
    this.drawTitle(dT);
    
    if(this.nextScene != 0) {
      return(this.nextScene);
    }
  }
  
  drawBackground() {
    background(100, 40, 160);
  
    strokeWeight(0);
    for(let i = 0; i < 600; i+=10) {
      fill((255 - (i * 255 / 600))/1.5, 0, 50 + (i * 255 / 600));
      rect(300, i+300, 600, 600);
    }
  }
  
  drawTitle(dT) {
    for(let i = 0; i < 8; i++) {
      let c = (i/8) * 255;
      fill(c*0.7, c*0.2, c);
      textSize(55 + 1.5 * sin(frameCount/20));
      text("CHARGE  FIGHTERS", 300+(i), 85+(i));
    }
  }
}