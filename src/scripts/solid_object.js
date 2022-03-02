class SolidObject {
  constructor(params) {
    this.map = params["map"]; // current level
    this.x_pos = params["pos"][0];
    this.y_pos = params["pos"][1];
    this.camera = params["camera"];

    this.radius = 40
    this.height = this.radius*2;      
    this.width = this.radius*2;       
    this.x_vel = 0; 
    this.y_vel = 0;     
    this.friction = .95

    this.currentFrame = 1;
    this.flip = false;
  }

  // getting starting position from sprite sheet
  getStartingPos(tileNum, frameSouceWidth, frameSouceHeight, numColSheet) {
    let row = Math.floor((tileNum - 1) / numColSheet); // Num of columns in sprite sheet
    let col = (tileNum % numColSheet) || numColSheet;
    
    let x = (col - 1) * frameSouceWidth;
    let y = row * frameSouceHeight;
    return [x, y];
  }

  drawSpriteAnimation(ctx, image, frameCounter, frameSouceWidth, frameSouceHeight, numColSheet, targetWidth, targetHeight) {
    let [tileClipX,tileClipY] = this.getStartingPos(Math.floor(frameCounter), frameSouceWidth, frameSouceHeight, numColSheet)
    if ((this.x_pos > this.camera.cam_x - this.width) && (this.x_pos - this.width < (this.camera.cam_x + this.camera.width))) {
      ctx.drawImage(
        image, // image
        tileClipX, // source x to start clipping
        tileClipY,  // source y to start clipping
        frameSouceWidth, // source width
        frameSouceHeight, // source height
        this.x_pos - this.camera.cam_x,  // target x to place on the canvas
        this.y_pos, // target y to place on the canvas
        targetWidth, // target width
        targetHeight // target height
      );
    }
  }

  drawStaticSprite(ctx, image, targetWidth, targetHeight) {
    if ((this.x_pos > this.camera.cam_x) && (this.x_pos < (this.camera.cam_x + this.camera.width))) {
      ctx.drawImage(
        image, // image
        this.x_pos - this.camera.cam_x,  // target x to place on the canvas
        this.y_pos, // target y to place on the canvas
        targetWidth, // target width
        targetHeight // target height
      );
    }
  }

  draw(ctx) {
    if (this.static) {
      this.drawStaticSprite(ctx, this.img, this.spriteWidth, this.spriteHeight);
    } else {
      if (this.currentFrame <= this.spriteCols) {
        this.currentFrame += this.currentFrameFPSCounter;
      } else {
        this.currentFrame = 1;
      }
      this.drawSpriteAnimation(ctx, this.img, this.currentFrame, this.spriteWidth, this.spriteHeight, this.spriteCols, this.width, this.height);
    }
  }
  
  // isCollidedWithObject(otherObject) {
  //   let [x1, y1] = [this.x_pos, this.y_pos]
  //   let [x2, y2] = [otherObject.x_pos, otherObject.y_pos]
  //   let rad1 = this.radius
  //   let rad2 = otherObject.radius;
  //   let dist = () => {
  //     return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
  //   }
  //   return (dist() < (rad1 + rad2))
  // }

  // collideWithObject(otherObject, level) {
  //   // if (otherObject instanceof Coin) {
  //   //   level.remove(otherObject);
  //   //   this.numCoins += 1;
  //   // } else if (otherObject instanceof Enemy) {
  //   //   // otherObject.relocate();
  //   //   console.log("It's an enemy!")
  //   // }
  // }
  
  // move(timeDelta) {
  //   const NORMAL_FRAME_TIME_DELTA = 1000000 //1200 / 60;
  //   const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

  //   this.x_pos += this.x_vel * velocityScale;
  //   this.x_vel *= this.friction
  //   this.x_pos += this.x_vel
    
  //   this.y_pos += this.y_vel * velocityScale;

  //   this.y_vel += 1.5
  //   this.y_vel *= this.friction
  //   this.y_pos += this.y_vel

  //   this.collideWithTile(this.x_vel, this.y_vel)
  // }

  // moveHorizontal(dir) {
  //   let [dirX, dirY] = dir
  //   this.x_vel +=  dirX / 150
  //   this.x_pos += this.x_vel
  // }
  
  // jump () {
  //   let now = Date.now();
  //   let elapsed = now - this.lastJump;

  //   if ((elapsed > this.jumpInterval) && (this.jumpCount < 1)) {
  //     this.lastJump = now - (elapsed % this.jumpInterval);
  //     this.y_vel -= 30 ;
  //     this.jumping = true;
  //     this.jumpCount += 1;
  //   }
  // }

  // collideWithTile(dirX, dirY) {
  //   let left = this.x_pos + this.radius;
  //   let right = this.x_pos + 1.5*this.radius;
  //   let top = this.y_pos //- this.radius;
  //   let bottom = this.y_pos + this.radius;

  //   // check for collisions on sprite sides
  //   let collision =
  //   this.map.solidTile(left, top) || // left
  //   this.map.solidTile(right, top) || // right
  //   this.map.solidTile(right, bottom) || // top
  //   this.map.solidTile(left, bottom);   //bottom
    
  //   if (collision) { 
      
  //     // Going down into tile
  //     if (dirY > 0) {
  //       let row = this.map.getRowCol(bottom + 1);
  //       this.y_pos = -this.radius + this.map.getNum(row);
  //       this.y_vel = 0;
  //       this.jumping = false;
  //       this.jumpCount = 0;
  //     }
      
  //     // Going up into tile
  //     else if (dirY < 0) {
  //       let row = this.map.getRowCol(top);
  //       this.y_pos = this.radius + this.map.getNum(row + 1);
  //       // this.y_pos = this.radius + this.map.getNum(row + 1) - (this.map.outputSize/2);
  //     }
      
  //     // Going right into tile
  //     else if (dirX > 0) {
  //       let col = this.map.getRowCol(right);
  //       this.x_pos = -this.radius + this.map.getNum(col);
  //     }
      
  //     // Going right into tile
  //     else if (dirX < 0) {
  //       let col = this.map.getRowCol(left);
  //       this.x_pos = this.radius + this.map.getNum(col + 1);
  //     }

  //   }
  // }

}

module.exports = SolidObject;