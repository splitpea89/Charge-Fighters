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
    translate(this.x-(this.w/2), this.y-(this.h/2));
    rotate(this.r);
    image(this.img, 0, 0, this.w, this.h); 
    pop();
  }
}