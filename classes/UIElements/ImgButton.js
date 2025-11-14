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
    if(adjMouseX >= this.x && adjMouseX <= this.x + this.w && 
      adjMouseY >= this.y && adjMouseY <= this.y + this.h) {
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