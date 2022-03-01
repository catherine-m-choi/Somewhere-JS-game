class Player {
  constructor(params) {
    this.game = params["game"];
    this.map = params["map"]; // current level
    this.radius = 40
    this.height = this.radius*2;      
    this.width = this.radius*2;       
    this.jumpCount = 0;    // For checking jump. If currently jumping (jumpCount > 1), cannot jump again/
                           //For adding in double jump. If
    this.lastJump = Date.now() - 1000;
    this.jumpInterval = 400;
    this.x_pos = 100;      // temporary starting x_pos for demo
    this.y_pos = 100;      // temporary starting y_pos for demo
    this.x_vel = 0;     // set bottom limit later; set upper limit later
    this.y_vel = 0;     

    this.friction = .95

    this.tempGirl = new Image();
    this.tempGirl.src = './src/assets/temp_girl_sprite.png';
    
    // sprite animations:
    this.flip = false;
    // 2080 × 1816 | 5 cols and 4 rows | each sprite is 416 x 454
    this.girlRunning = new Image();
    this.girlRunning.src = './src/assets/girl_running.png';
    this.currentRunningFrame = 1;

    // 1664 × 1816 | 4 cols and 4 rows | each sprite is 416 x 454
    this.girlIdling = new Image();
    this.girlIdling.src = './src/assets/girl_idling.png';
    this.currentIdleFrame = 1;

    // 3606 × 2510 | 6 cols and 5 rows | each sprite is 601 x 502
    this.girlDying = new Image();
    this.girlDying.src = './src/assets/girl_dying.png';
    this.currentDyingFrame = 1;
  }

  // getting starting position from sprite sheet
  getStartingPos(tileNum, frameSouceWidth, frameSouceHeight, numColSheet) {
    let row = Math.floor((tileNum - 1) / numColSheet); // Num of columns in sprite sheet
    let col = (tileNum % numColSheet) || numColSheet;
    
    let x = (col - 1) * frameSouceWidth;
    let y = row * frameSouceHeight;
    return [x, y];
  }

  draw(ctx) {
    
    if (Math.abs(this.x_vel) < 0.2) {
      if (this.currentIdlingFrame <= 16) {
        this.currentIdlingFrame += (4/16);
      } else {
        this.currentIdlingFrame = 1;
      }
      this.drawSpriteAnimation(ctx, this.girlIdling, this.currentIdlingFrame, 416, 454, 4, this.width, this.height)
    } else {
      if (this.currentRunningFrame <= 20) {
        this.currentRunningFrame += (10/20);
      } else {
        this.currentRunningFrame = 1;
      }
      this.drawSpriteAnimation(ctx, this.girlRunning, this.currentRunningFrame, 416, 454, 5, this.width, this.height)
    }

    this.map.camera.update();

    // Need to add another if condition to draw dying sprite animation. Will need to check against player's health
    // if (this.currentDyingFrame <= 30) {
    //   this.currentDyingFrame += (10/30);
    // }
    // else {
    //   this.currentDyingFrame = 1;
    // }
    // this.drawSpriteAnimation(ctx, this.girlDying, this.currentDyingFrame, 601, 502, 6, 120, 100)
    
  }

  drawSpriteAnimation(ctx, image, frameCounter, frameSouceWidth, frameSouceHeight, numColSheet, targetWidth, targetHeight) {
    let [tileClipX,tileClipY] = this.getStartingPos(Math.floor(frameCounter), frameSouceWidth, frameSouceHeight, numColSheet)

    if (this.flip) { // flip image
      ctx.save();
      ctx.translate(this.screenX + targetWidth, this.y_pos- this.radius);
      ctx.scale(-1, 1);

      ctx.drawImage(
        image, // image
        tileClipX, // source x to start clipping
        tileClipY,  // source y to start clipping
        frameSouceWidth, // source width
        frameSouceHeight, // source height
        0,  // target x to place on the canvas
        0, // target y to place on the canvas
        targetWidth, // target width
        targetHeight // target height
        );
      ctx.restore();
    } else {
      ctx.drawImage(
        image, // image
        tileClipX, // source x to start clipping
        tileClipY,  // source y to start clipping
        frameSouceWidth, // source width
        frameSouceHeight, // source height
        this.screenX,  // target x to place on the canvas
        this.y_pos- this.radius, // target y to place on the canvas
        targetWidth, // target width
        targetHeight // target height
        );
      }
  }

  move(timeDelta) {
    const NORMAL_FRAME_TIME_DELTA = 1000000 //1200 / 60;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    // horizontal movement
    // offsetX = this.x_vel * velocityScale,
    // offsetY = this.y_vel * velocityScale;
    
    // this.x_pos += this.x_vel * velocityScale;
    this.x_pos += this.x_vel * velocityScale;
    this.x_vel *= this.friction
    this.x_pos += this.x_vel
    
    // vertical movement
    this.y_pos += this.y_vel * velocityScale;

    // gravity?
    this.y_vel += 1.5
    this.y_vel *= this.friction
    this.y_pos += this.y_vel

    // collision detection
    this.collideWithTile(this.x_vel, this.y_vel)
  }

  moveHorizontal(dir) {
    let [dirX, dirY] = dir

    // horizontal movement
    this.x_vel +=  dirX / 150
    this.x_pos += this.x_vel
    // this.x_vel *= this.friction
  }
  
  jump () {
    let now = Date.now();
    let elapsed = now - this.lastJump;

    if ((elapsed > this.jumpInterval) && (this.jumpCount < 1)) {
      this.lastJump = now - (elapsed % this.jumpInterval);
      this.y_vel -= 30 ;
      this.jumping = true;
      this.jumpCount += 1;
    }
  }

  collideWithTile(dirX, dirY) {
    let left = this.x_pos + this.radius;
    let right = this.x_pos + 1.5*this.radius;
    let top = this.y_pos //- this.radius;
    let bottom = this.y_pos + this.radius;

    // check for collisions on sprite sides
    let collision =
    this.map.solidTile(left, top) || // left
    this.map.solidTile(right, top) || // right
    this.map.solidTile(right, bottom) || // top
    this.map.solidTile(left, bottom);   //bottom
    
    if (collision) { 
      
      // Going down into tile
      if (dirY > 0) {
        let row = this.map.getRowCol(bottom + 1);
        this.y_pos = -this.radius + this.map.getNum(row);
        this.y_vel = 0;
        this.jumping = false;
        this.jumpCount = 0;
      }
      
      // Going up into tile
      else if (dirY < 0) {
        let row = this.map.getRowCol(top);
        this.y_pos = this.radius + this.map.getNum(row + 1);
        // this.y_pos = this.radius + this.map.getNum(row + 1) - (this.map.outputSize/2);
      }
      
      // Going right into tile
      else if (dirX > 0) {
        let col = this.map.getRowCol(right);
        this.x_pos = -this.radius + this.map.getNum(col);
      }
      
      // Going right into tile
      else if (dirX < 0) {
        let col = this.map.getRowCol(left);
        this.x_pos = this.radius + this.map.getNum(col + 1);
      }

    }
  }
}

module.exports = Player;