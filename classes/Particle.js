class Particle {
  constructor(col, w, h, x, y, vX, vY, slowF, lifetime) {
    this.col = col;
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.r = 0;
    this.vR = 0.1;
    this.vX = vX;
    this.vY = vY;
    this.slowF = slowF;
    this.lifetime = lifetime;
    this.totLife = lifetime;
  }
  
  // returns 1 if particle has exceeded its lifetime
  update() {
    this.vX *= this.slowF;
    this.vY *= this.slowF;
    this.vR *= this.slowF;
    this.x += this.vX;
    this.y += this.vY;
    this.r += this.vR;
    this.w *= this.slowF;
    this.h *= this.slowF;
    this.lifetime -= 1;
    if(this.lifetime <= 0) {
      return 1;
    }
    return 0;
  }
  
  drawParticle() {
    fill(this.col);
    strokeWeight(0);
    push();
    translate(this.x, this.y);
    rotate(this.r);
    rect(0, 0, this.w, this.h);
    pop();
  }

  static updateAndDrawParticles(activeParticles) {
    for(let i = 0; i < activeParticles.length; i++) {
        if(activeParticles[i].update() == 1) {
            activeParticles.splice(i, 1);
            continue;
        }
        activeParticles[i].drawParticle();
    }
  }

  static createParticleExplosion(x, y, col, v, slowF, life, count, activeParticles) {
    for(let i = 0; i < count; i++) {
        append(activeParticles, new Particle(col, 10, 10, x, y, random(-v, v), random(-v, v), slowF, life));
    }
  }
}