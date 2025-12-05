let activeScene = new TitleScene();
let startTime, lastTime;

const SCALE_FACTOR = 1.15;
let adjMouseX;
let adjMouseY;

let icon;

let transition;

function preload() {
  icon = loadImage("assets/placeholder-icon.png");
}

function setup() {
  let canvas = createCanvas(600*SCALE_FACTOR, 600*SCALE_FACTOR);
  canvas.parent("game-div");
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  
  startTime = millis();
  lastTime = millis();
  activeScene.init();

  transition = new TransitionManager();
}

function draw() {
  push();
  adjMouseX = mouseX/SCALE_FACTOR;
  adjMouseY = mouseY/SCALE_FACTOR;
  scale(SCALE_FACTOR);
  let scene;
  if(transition.active) {
    transition.update();
    transition.draw();
  } else {
    scene = activeScene.runLoop(millis() - lastTime); // we're giving the amount of time in ms passed since last loop 
    lastTime = millis();
  }
  if(scene != undefined) {
    scene.init();
    transition.start(() => {activeScene = scene;});
  }
  pop();
}

function mousePressed() {
    userStartAudio();
}