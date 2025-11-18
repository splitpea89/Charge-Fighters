class Spikes extends GameElement {
    constructor(x, y, w, h, num, pol, facing, col) {
        super();
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.num = num;
        this.pol = pol; // -1, 0, or 1
        this.facing = facing; // 0, 1, 2, 3 -- up, right, down, left
        this.col = col;
    }

    update() {

    }

    drawElement() {
        let leftX = this.x - this.w/2;
        let rightX = this.x + this.w/2;
        let topY = this.y - this.h/2;
        let bottomY = this.y + this.h/2;
        let dx = this.w/this.num;
        let dy = this.h/this.num;

        fill(this.col);
        strokeWeight(1);

        if(this.facing == 0) {
            for(let i = 0; i < this.num; i++) {
                triangle(leftX+(i*dx), bottomY, leftX+(i*dx)+(dx/2), topY, leftX+(i+1)*dx, bottomY);
            }
        } else if(this.facing == 1) {
            for(let i = 0; i < this.num; i++) {
                triangle(leftX, topY+(i*dy), rightX, topY+(i*dy)+(dy/2), leftX, topY+(i+1)*dy);
            }
        } else if(this.facing == 2) {
            for(let i = 0; i < this.num; i++) {
                triangle(leftX+(i*dx), topY, leftX+(i*dx)+(dx/2), bottomY, leftX + (i+1)*dx, topY);
            }
        } else {
            for(let i = 0; i < this.num; i++) {
                triangle(rightX, topY+(i*dy), leftX, topY+(i*dy)+(dy/2), rightX, topY+(i+1)*dy);
            }
        }
    }
}