//  CLASSES   \\

// ABSTRACT
class UIElement {
  constructor() {
    if(this.constructor === UIElement) {
      throw new TypeError("UIElement cannot be instantiated directly");
    }
    
    if(this.update == undefined) {
      throw new TypeError("Children of UIElement must implement update()");
    }
    
    if(this.drawElement == undefined) {
      throw new TypeError("Children of UIElement must implement drawElement()");
    }
  }
}

class LineMagnet extends UIElement {
  constructor(x, y, vX, vY, r, vR, scl) {
    super();
    this.x = x;
    this.y = y;
    this.vX = vX;
    this.vY = vY;
    this.r = r;
    this.vR = vR;
    this.scl = scl;
  }
  
  update() {
    this.x += this.vX;
    this.y += this.vY;
    this.r += this.vR;
    if(this.x >= 600 - this.scl*20 && this.vX > 0){this.vX*=-1}
    if(this.y >= 600 - this.scl*20 && this.vY > 0){this.vY*=-1}
    if(this.x <= 0 + this.scl*20 && this.vX < 0){this.vX*=-1}
    if(this.y <= 0 + this.scl*20 && this.vY < 0){this.vY*=-1}
  }
  
  drawElement() {
    push();
    translate(this.x, this.y);
    rotate(this.r);
    scale(this.scl);

    textSize(14);

    strokeWeight(2);

    fill(0, 0, 200);
    rect(-20, 0, 40, 20);
    fill(0);
    text("-", -30, 5);

    fill(200, 0, 0);
    rect(20, 0, 40, 20);
    fill(0);
    text("+", 30, 5);

    pop();
  }
}

class RectButton extends UIElement {
  constructor(x, y, w, h, r, col, pressedCol, txt, txtSize, txtCol, func) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.col = col;
    this.pressedCol = pressedCol;
    this.txt = txt;
    this.txtSize = txtSize;
    this.txtCol = txtCol;
    this.func = func;
    this.state = 0; // 0 = inactive, 1 = hovering, 2 = clicked
  }
  
  update() {
    if(mouseX >= this.x - (this.w/2) && mouseX <= this.x + (this.w/2) && 
      mouseY >= this.y - (this.h/2) && mouseY <= this.y + (this.h/2)) {
      if(mouseIsPressed) {
        this.state = 2;
      } else {
        if(this.state == 2) {
          this.func();
          this.state = 1;
        } else {
          this.state = 1;
        }
      }
    } else {
      this.state = 0;
    }
  }
  
  drawElement() {
    
    strokeWeight(3);
    
    fill(this.pressedCol);
    if(this.state == 0) {
      fill(this.col);
    }
    
    if(this.state == 2) {
      rect(this.x, this.y, this.w-10, this.h-10, this.r);
      textSize(this.txtSize - 3);
    } else {
      rect(this.x, this.y, this.w, this.h, this.r);
      textSize(this.txtSize);
    }
    
    
    fill(this.txtCol);
    text(this.txt, this.x, this.y + (this.h/2.5), this.w, this.h);
  }
  
}

class ImgButton extends UIElement {
  constructor(x, y, w, h, img1, img2, func) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img1 = img1;
    this.img2 = img2;
    this.func = func;
    this.state = true; // true = on, false = off
    this.wasPressed = false;
  }
  
  update() {
    if(mouseX >= this.x && mouseX <= this.x + this.w && 
      mouseY >= this.y && mouseY <= this.y + this.h) {
      if(mouseIsPressed) {
        this.wasPressed = true;
      } else {
        if(this.wasPressed) {
          this.func();
          this.state = !this.state;
        }
        wasPressed = false;
      }
    } else {
      this.state = 0;
    }
  }
  
  drawElement() {
    
    if(this.state) {
      image(this.img1, this.x, this.y, this.w, this.h);
    } else {
      image(this.img2, this.x, this.y, this.w, this.h);
    }
    
  }
}

class ImgIcon extends UIElement {
  constructor(x, y, w, h, r, img, updateFunc) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.img = img;
    this.updateFunc = updateFunc;
  }
  
  update() {
    if(this.updateFunc != undefined) {
      this.updateFunc();
    }
  }
  
  drawElement() {
    push();
    translate(this.x, this.y);
    rotate(this.r);
    image(this.img, 0, 0, this.w, this.h); 
    pop();
  }
}

class TextBox extends UIElement {
  constructor(x, y, w, h, r, txt, tSize, bgCol, txtCol) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.txt = txt;
    this.tSize = tSize;
    this.bgCol = bgCol;
    this.txtCol = txtCol;
  }
  
  update() {
    
  }
  
  drawElement() {
    push();
    translate(this.x, this.y);
    rotate(this.r);
    fill(this.bgCol);
    rect(0, 0, this.w+20, this.h+20, 10);
    textSize(this.tSize);
    fill(this.txtCol);
    text(this.txt, 0, 0, this.w, this.h); 
    pop();
  }
}

// ABSTRACT
class GameElement {
  constructor() {
    if(this.constructor === GameElement) {
      throw new TypeError("GameElement cannot be instantiated directly");
    }
    
    if(this.update == undefined) {
      throw new TypeError("Children of GameElement must implement update()");
    }
    
    if(this.drawElement == undefined) {
      throw new TypeError("Children of GameElement must implement drawElement()");
    }
  }
}

class Platform extends GameElement{
  constructor(x, y, w, h, pol, moving, params) {
    super();
    this.x = x;      // x position
    this.y = y;      // y position
    this.w = w;      // width
    this.h = h;      // height
    this.pol = pol;  // polarity (-1, 0, or 1)
    this.moving = moving;
    if(moving == true) {
      this.x1 = params[0]; // must be leftmost or topmost point first
      this.y1 = params[1];
      this.x2 = params[2];
      this.y2 = params[3];
      this.increment = params[4];
      this.start = params[5]; // either 1 or 2 - first or second point
      this.target = 3 - this.start; // 1 or 2 - opposite of start
    }
  }
  
  update() {
    //  moving platforms
    if(this.moving == true) {
    
      
      let dx = this.x2 - this.x1;
      let dy = this.y2 - this.y1;
      
      if(this.target == 1) {
        dx *= -1;
        dy *= -1;
      }
      
      this.x += (dx/this.increment);
      this.y += (dy/this.increment);
      
      if(this.x1 != this.x2) {
        if(this.target == 1 && this.x <= this.x1) {
          this.target = 2;
        } else if(this.target == 2 && this.x >= this.x2) {
          this.target = 1;
        }
      } else {
        if(this.target == 1 && this.y <= this.y1) {
          this.target = 2;
        } else if(this.target == 2 && this.y >= this.y2) {
          this.target = 1;
        }
      }
      
    }
    
    
  }
  
  drawElement() {
    strokeWeight(2);
    fill(50 + (this.pol * 100), 50 - abs(this.pol*25), 50 - (this.pol * 100));
    rect(this.x, this.y, this.w, this.h, 4);
    textSize(20);
    fill(255);
    if(this.pol == 1) {
      text("+", this.x, this.y+this.h/3);
    } else if(this.pol == -1) {
      text("-", this.x, this.y+this.h/3);
    }
  }
}

class Player {
  constructor(x, y, pol, plrNum) {
    this.x = x;
    this.y = y;
    this.vX = 0;
    this.vY = 0;
    this.plrNum = plrNum; // 1 or 2
    this.pol = pol; // -1 or 1
    this.size = 20;
    this.maxVX = 6;
    this.maxVY = 6;
    this.torque = 0.4;
    this.gravity = 0.25;
    this.jumpForce = 7.5;
    this.grounded = false;
    this.groundFrictionFactor = 0.96;
    this.polKeyWasDown = false;
  }
  
  update(gameScene) {
    // magnetism TODO: problem: rectangles x, y defined at their top left corner

    for(let i in gameScene.polarElements) {
        let element = gameScene.polarElements[i];

        let mag = dist(this.x, this.y, element.x, element.y);

        if(mag <= 100 && mag > 0) {

            let dx;
            let dy;

            if(element.constructor === Platform && false) { // TODO: implement function
                let closestP = findClosestPointOnLineSeg() // <-
                dx = closestP[0];
                dy = closestP[1];
            } else {
                dx = element.x - this.x;
                dy = element.y - this.y;
            }
            this.vX -= this.pol * element.pol * dx / (pow(mag, 1.5))
            this.vY -= this.pol * element.pol * dy / (pow(mag, 1.5))

            this.vX = constrain(this.vX, -this.maxVX, this.maxVX);
            this.vY = constrain(this.vY, -this.maxVY, this.maxVY);

        }
    }
    
    if(this.vY <= this.maxVY) {
      this.vY += this.gravity; // gravity
    }
    
    // controls
       
    if(this.plrNum == 1) {
      // with WASD
      if (keyIsDown(65) && this.vX >= -this.maxVX) { // 'A'
        this.vX -= this.torque;
      }
      if (keyIsDown(68) && this.vX <= this.maxVX) { // 'D'
        this.vX += this.torque;
      }
      // Jumping
      if(keyIsDown(87) && this.grounded) { // 'W' TODO: unset grounded after sliding off platform? coyote time?
        this.grounded = false;
        this.vY = min(-this.jumpForce, this.vY - this.jumpForce);
      }
      // Polarity
      if(keyIsDown(83)) { // 'S'
        if(!this.polKeyWasDown) {
          this.changePolarity();
        }
        this.polKeyWasDown = true;
      } else {
        this.polKeyWasDown = false;
      }
    } else if(this.plrNum == 2) {
      if(keyIsDown(LEFT_ARROW) && this.vX >= -this.maxVX) {
        this.vX -= this.torque;
      }
      if(keyIsDown(RIGHT_ARROW) && this.vX <= this.maxVX) {
        this.vX += this.torque;
      }
      // Jumping
      if(keyIsDown(UP_ARROW) && this.grounded) {
        this.grounded = false;
        this.vY -= this.jumpForce;
      }
      // Polarity
      if(keyIsDown(DOWN_ARROW)) {
        if(!this.polKeyWasDown) {
          this.changePolarity();
        }
        this.polKeyWasDown = true;
      } else {
        this.polKeyWasDown = false;
      }
    }
    
    this.x += this.vX; // update velocity
    this.y += this.vY;
    
    if(this.grounded) {this.vX *= this.groundFrictionFactor;}
    
    // Platform Collisions
    
    for(let i in gameScene.platforms) {
      let p = gameScene.platforms[i];

      let halfSize = this.size / 2;
      let pHalfW = p.w / 2;
      let pHalfH = p.h / 2;
      let pCenterX = p.x;
      let pCenterY = p.y;

      if(overlapRects(this.x, this.y, this.size, this.size, p.x, p.y, p.w, p.h)) {
        
        // Collision
        
        if (this.y < pCenterY) {
          // landed on top
          this.y = pCenterY - (pHalfH + halfSize);
          this.vY = 0;
          this.grounded = true;
        } else {
          // hit from below
          this.y = pCenterY + (pHalfH + halfSize);
          this.vY = 0;
        } // TODO: account for side collision? make platform thinner?
      }
    }

    // Player Collisions
    if(this.plrNum == 1) {handlePlayerCollisions(this, gameScene.plr2, gameScene);}
  }
  
  drawPlayer() {
    fill(50 + (this.pol * 100), 50 - abs(this.pol*25), 50 - (this.pol * 100));
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size);
    textSize(11);
    fill(255);
    text(str(this.plrNum), this.x, this.y+(this.size/5));
  }
  
  changePolarity() {
    this.pol *= -1;
    // TODO: add effects and cooldown
  }
}

// ------------------------------------------------------- \\

// ABSTRACT
class Scene {
  constructor() {
    if(this.constructor === Scene) {
      throw new TypeError("Scene cannot be instantiated directly");
    }
    
    if(this.init === undefined) {
      throw new TypeError('Classes extending the abstract class "Scene" must contain "init()"');
    }
    
    if(this.runLoop === undefined) {
      throw new TypeError('Classes extending the abstract class "Scene" must contain "runLoop()"');
    }
  } 
}

// ------------------------------------------------------- \\

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
      this.SFXSlider.position(200, 375);
      
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
      // TODO: create about menu
      
      append(this.menuElements, new TextBox(310, 225, 400, 230, 0, "Charge Fighters is a round-based platformer where players duel using magnetic polarity. \n\n" +
  "Switch charges to attract or repel opponents and interact with arena hazards. \n\n" +
  "Power-ups appear to give strategic advantages, and the arena grows more dangerous over time. \n\n" +
  "Score points by defeating opponents before the arena becomes too hazardous!", 15, color(50), color(220)));
      
      append(this.menuElements, new TextBox(150, 425, 250, 80, 0, "P1 Controls: \nMove: A and D\nJump: W\nSwitch Polarity: S", 15, color(50), color(220)));
      append(this.menuElements, new TextBox(450, 425, 250, 80, 0, "P2 Controls: \nMove: Left Arrow and Right Arrow\nJump: Up arrow\nSwitch Polarity: Down arrow", 15, color(50), color(220)));
      
      
      append(this.menuElements, new RectButton(300, 537, 200, 75, 10, color(0, 100, 150), color(0, 50, 100), "BACK", 15, color(10), this.startMenu.bind(this)));
    }
    console.log("about menu");
  }
  
  startGame() {
    console.log("start game") 
    this.nextScene = (new GameScene());
  }
  
  runLoop(dT) {
    this.drawBackground();
  
    updateAndDrawElements(this.sceneElements);
    updateAndDrawElements(this.menuElements);
    
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
  }
  
  drawArena() {
    // TODO: design
    background(10);
    fill(160);
    rect(300, 300, 550, 550);
    
  }
}

// ------------------------------------------------------- \\


