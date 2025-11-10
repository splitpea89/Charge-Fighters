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