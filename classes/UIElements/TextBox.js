class TextBox extends UIElement {
  constructor(x, y, w, h, r, txt, tSize, bgCol, txtCol, strokeWeight) {
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
    this.strokeWeight = strokeWeight;
  }
  
  update() {
    
  }
  
  drawElement() {
    push();
    translate(this.x, this.y);
    rotate(this.r);
    fill(this.bgCol);
    if(this.strokeWeight != undefined) {strokeWeight(this.strokeWeight);}
    rect(0, 0, this.w+20, this.h+20, 10);
    textSize(this.tSize);
    fill(this.txtCol);
    text(this.txt, 0, 0, this.w, this.h); 
    pop();
  }
}