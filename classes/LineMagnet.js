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