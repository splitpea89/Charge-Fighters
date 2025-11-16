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
    if(adjMouseX >= this.x-(this.w/2) && adjMouseX <= this.x+(this.w/2) && 
      adjMouseY >= this.y-(this.h/2) && adjMouseY <= this.y+(this.h/2)) {
      if(mouseIsPressed) {
        this.wasPressed = true;
      } else {
        if(this.wasPressed) {
          this.func();
          this.state = !this.state;
        }
        this.wasPressed = false;
      }
    } else {
      this.state = 0;
    }
  }
  
  drawElement() {
    
    if(!this.state && !this.img2 == undefined) {
      image(this.img2, this.x-(this.w/2), this.y-(this.h/2), this.w, this.h);
    } else {
      image(this.img1, this.x-(this.w/2), this.y-(this.h/2), this.w, this.h);
    }
    
  }
}