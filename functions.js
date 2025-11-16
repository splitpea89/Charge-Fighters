// FUNCTIONS \\

function updateAndDrawElements(elements, activated) {
  for(let i = 0; i < elements.length; i++) {
    if(elements[i] == undefined) { // should check if element still exists
      elements.splice(i, 1);
      i--;
    } else {
      if(activated) {
        elements[i].update();
      }
      elements[i].drawElement();
    }
  }
}

function updateAndDrawPlayers(plr1, plr2, activated, gameScene) {
  if(activated && !gameScene.paused) {
    plr1.update(gameScene);
    plr2.update(gameScene);
  }
  plr1.drawPlayer();
  plr2.drawPlayer();
}

function overlapRects(x1, y1, w1, h1, x2, y2, w2, h2) {
    // defined around CENTER of rect
    let halfW1 = w1 / 2;
    let halfW2 = w2 / 2;
    let halfH1 = h1 / 2;
    let halfH2 = h2 / 2;

    let overlapX = halfW1 + halfW2 - abs(x2-x1);
    let overlapY = halfH1 + halfH2 - abs(x2-x1);
    
    return([abs(x2 - x1) < halfW1 + halfW2 && abs(y2 - y1) < halfH1 + halfH2, overlapX, overlapY]); // [bool isOverlapping, num xOverlap, num yOverlap]
}

function findClosestPointOnLineSeg(px, py, x1, y1, x2, y2) {
    // where (px, py) is a point and,
    // (x1, y1) and (x2, y2) are the endpoints of a line segment,
    // return the point (x, y) on the given line segment which minimizes the distance to (px, py)
    // in the form of an array of length 2 where arr[0] = x and arr[1] = y


}

function handlePlayerCollisions(plr1, plr2, gameScene) {
  let dx = plr2.x - plr1.x;
  let dy = plr2.y - plr1.y;

  let overlapX = plr1.size/2 + plr2.size/2 - Math.abs(dx);
  let overlapY = plr1.size/2 + plr2.size/2 - Math.abs(dy);

  if (overlapX > 0 && overlapY > 0) {
    // Collision occurred

    // Resolve the smaller overlap axis first (to push them apart)
    if (overlapX < overlapY) {
      // Horizontal collision
      if (dx > 0) {
        // plr2 is to the right
        plr1.x -= overlapX / 2;
        plr2.x += overlapX / 2;
      } else {
        plr1.x += overlapX / 2;
        plr2.x -= overlapX / 2;
      }

      // Reverse horizontal velocity 
      let tempVX = plr1.vX;
      plr1.vX = plr2.vX * 0.5;
      plr2.vX = tempVX * 0.5;
    } else {
      // Vertical collision
      if (dy > 0) {
        // plr2 is below
        plr1.y -= overlapY / 2;
        plr2.y += overlapY / 2;
        if(abs(plr1.vY) < 0.1) {plr1.grounded = true;}
      } else {
        plr1.y += overlapY / 2;
        plr2.y -= overlapY / 2;
        if(abs(plr2.vY) < 0.1) {plr2.grounded = true;}
      }

      // Reverse vertical velocity
      let tempVY = plr1.vY;
      plr1.vY = plr2.vY * 0.5;
      plr2.vY = tempVY * 0.5;
    }
  }
}