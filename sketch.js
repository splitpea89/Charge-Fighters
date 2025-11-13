let activeScene = new TitleScene();
let startTime, lastTime;

const SCALE_FACTOR = 1.2;
let adjMouseX;
let adjMouseY;

let icon;

function preload() {
  icon = loadImage("placeholder-icon.png");
}

function setup() {
  createCanvas(600*SCALE_FACTOR, 600*SCALE_FACTOR);
  rectMode(CENTER);
  
  startTime = millis();
  lastTime = millis();
  activeScene.init();
}

function draw() {
  push();
  adjMouseX = mouseX/SCALE_FACTOR;
  adjMouseY = mouseY/SCALE_FACTOR;
  scale(scaleFactor);
  let scene = activeScene.runLoop(millis() - lastTime); // we're giving the amount of time in ms passed since last loop 
  lastTime = millis();
  if(scene != undefined) {
    scene.init();
    activeScene = scene;
  }
  pop();
}