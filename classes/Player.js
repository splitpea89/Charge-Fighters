class Player {
  constructor(x, y, pol, plrNum) {
    this.x = x;
    this.y = y;
    this.vX = 0;
    this.vY = 0;
    this.plrNum = plrNum; // 1 or 2
    this.pol = pol; // -1 or 1
    this.isAlive = true;
    this.size = 20;
    this.maxVX = 6;
    this.maxVY = 6;
    this.overMaxSpeedPenaltyFactor = 0.95;
    this.torque = 0.4;
    this.gravity = 0.25;
    this.jumpForce = 5;
    this.jumping = false;
    this.jumpStart = 0;
    this.onWallLeniency = 30; // increase to increase leniency time for wall jump after hitting wall
    this.onWall = 0;
    this.wallSide = 0; // 1 if player is to the right, -1 if to the left
    this.wallJumpKickback = 10; // add this velocity horizontally away from wall
    this.grounded = false;
    this.groundFrictionFactor = 0.92;
    this.generalSlowdownFactor = 0.96;
    this.magnetismCoef = 1.5;
    this.distancePower = 1.3;
    this.polKeyWasDown = false;
    this.activeParticles = [];
  }
  
  update(gameScene) {
    // magnetism
    if(!this.isAlive) {return;}

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
            this.vX -= this.pol * element.pol * dx * this.magnetismCoef  / (pow(mag, this.distancePower))
            this.vY -= this.pol * element.pol * dy * this.magnetismCoef / (pow(mag, this.distancePower))

            if(abs(this.vX) > this.maxVX) {this.vX *= this.overMaxSpeedPenaltyFactor}
            if(abs(this.vY) > this.maxVY) {this.vY *= this.overMaxSpeedPenaltyFactor}

        }
    }

    this.vX *= this.generalSlowdownFactor;
    
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
      if(keyIsDown(87)) { // 'W' TODO: unset grounded after sliding off platform? coyote time?
        this.handleJump(87);
      } else {this.jumping = false;}
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
      if(keyIsDown(UP_ARROW)) {
        this.handleJump(UP_ARROW);
      } else {this.jumping = false;}
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

    if(this.y > 300 + gameScene.fieldSize/2 || this.y < 300 - gameScene.fieldSize/2 || this.x > 300 + gameScene.fieldSize/2 || this.x < 300 - gameScene.fieldSize/2) {

      if((this.plrNum == 1 && gameScene.plr2.isAlive) || (this.plrNum == 2 && gameScene.plr1.isAlive)) {

        this.isAlive = false;
        if(this.plrNum == 1 && gameScene.plr2.isAlive) {
          gameScene.score2++;
        } else if(this.plrNum == 2 && gameScene.plr1.isAlive) {
          gameScene.score1++;
        }
        return;

      }
    }
    
    if(this.grounded) {this.vX *= this.groundFrictionFactor;}
    
    // Platform Collisions
    
    for(let i in gameScene.platforms) {
      let p = gameScene.platforms[i];

      let halfSize = this.size / 2;
      let pHalfW = p.w / 2;
      let pHalfH = p.h / 2;
      let pCenterX = p.x;
      let pCenterY = p.y;

      let info = overlapRects(this.x, this.y, this.size, this.size, p.x, p.y, p.w, p.h);

      if(info[0]) {
        
        // Collision
        
        if(info[2] <= info[1]) {
          if (this.y < pCenterY) {
            // landed on top
            this.y = pCenterY - (pHalfH + halfSize);
            this.vY = 0;
            this.grounded = true;
          } else {
            // hit from below
            this.y = pCenterY + (pHalfH + halfSize);
            this.vY = 0;
          } 
        } else {
          if (this.x < pCenterX) {
            // hit left
            this.x = pCenterX - (pHalfW + halfSize);
            this.vX = 0.1;
            this.onWall = this.onWallLeniency;
            this.wallSide = -1;
          } else {
            // hit right
            this.x = pCenterX + (pHalfW + halfSize);
            this.vX = -0.1;
            this.onWall = this.onWallLeniency;
            this.wallSide = 1;
          } 
        }
      }

      this.onWall--;
    }

    // Player Collisions
    if(this.plrNum == 1) {handlePlayerCollisions(this, gameScene.plr2, gameScene);}
  }
  
  drawPlayer() {
    if(!this.isAlive) {return;}
    fill(50 + (this.pol * 100), 50 - abs(this.pol*25), 50 - (this.pol * 100));
    strokeWeight(2);
    rect(this.x, this.y, this.size, this.size);
    textSize(11);
    fill(255);
    text(str(this.plrNum), this.x, this.y+(this.size/5));
  }

  handleJump(jumpKey) {
    if(this.grounded) {
      this.grounded = false;
      this.vY = -this.jumpForce;
      this.jumping = true;
      this.jumpStart = millis();
    }

    if(this.onWall > 0) {
      this.onWall = 0;
      this.vY = -this.jumpForce;
      this.jumping = true;
      this.jumpStart = millis();
      this.vX += this.wallJumpKickback * this.wallSide;
      // add horizontal velocity away from wall
    }

    if(this.jumping) {
      if(!keyIsDown(jumpKey) || millis() - this.jumpStart > 200) {
        this.jumping = false;
      }
      this.vY = -this.jumpForce;
    }
  }
  
  changePolarity() {
    this.pol *= -1;
    // TODO: add effects and cooldown
    Particle.createParticleExplosion(this.x, this.y, color(50 + (this.pol * 100), 50 - abs(this.pol*25), 50 - (this.pol * 100)), 10, 0.9, 25, 25, this.activeParticles);
  }
}