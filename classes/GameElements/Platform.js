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
      this.scrolling = params[6]; // 1 or 2 or none. represents which point to tp back to
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
          if(this.scrolling == 2) {
            this.x = this.x2;
            this.y = this.y2;
          } else {
            this.target = 2;
          }
        } else if(this.target == 2 && this.x >= this.x2) {
          if(this.scrolling == 1) {
            this.x = this.x1;
            this.y = this.y1;
          } else {
            this.target = 1;
          }
        }
      } else {
        if(this.target == 1 && this.y <= this.y1) {
          if(this.scrolling == 2) {
            this.x = this.x2;
            this.y = this.y2;
          } else {
            this.target = 2;
          }
        } else if(this.target == 2 && this.y >= this.y2) {
          if(this.scrolling == 1) {
            this.x = this.x1;
            this.y = this.y1;
          } else {
            this.target = 1;
          }
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
      text("+", this.x, this.y);
    } else if(this.pol == -1) {
      text("-", this.x, this.y);
    }
  }
}