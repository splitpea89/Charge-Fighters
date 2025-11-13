let activeScene = new TitleScene();
let startTime, lastTime;

let scaleFactor = 1.2;
let adjMouseX;
let adjMouseY;

let icon;

function preload() {
  icon = loadImage("placeholder-icon.png");
}

function setup() {
  createCanvas(600*scaleFactor, 600*scaleFactor);
  rectMode(CENTER);
  
  startTime = millis();
  lastTime = millis();
  activeScene.init();
}

function draw() {
  push();
  adjMouseX = mouseX/scaleFactor;
  adjMouseY = mouseY/scaleFactor;
  scale(scaleFactor);
  let scene = activeScene.runLoop(millis() - lastTime); // we're giving the amount of time in ms passed since last loop 
  lastTime = millis();
  if(scene != undefined) {
    scene.init();
    activeScene = scene;
  }
  pop();
}