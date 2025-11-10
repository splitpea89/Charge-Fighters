let activeScene = new TitleScene();
let startTime, lastTime;

let icon;

function preload() {
  icon = loadImage("placeholder-icon.png");
}

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  startTime = millis();
  lastTime = millis();
  activeScene.init();
}

function draw() {
  let scene = activeScene.runLoop(millis() - lastTime); // we're giving the amount of time in ms passed since last loop 
  lastTime = millis();
  if(scene != undefined) {
    scene.init();
    activeScene = scene;
  }
}