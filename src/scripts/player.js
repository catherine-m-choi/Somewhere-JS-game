const Coin = require("./collectibles/coin");
const Enemy = require("./enemies/enemy");
const Fireball = require("./fireball");

class Player {
  constructor(params) {
    this.game = params["game"];
    this.map = params["map"]; // current level
    const difficulty = params["difficulty"] ??= 5
    
    this.radius = 40
    this.height = this.radius*2;      
    this.width = this.radius*2;       
    this.jumpCount = 0;    // For checking jump. If currently jumping (jumpCount > 1), cannot jump again/
    //For adding in double jump. If
    this.lastJump = Date.now() - 1000;
    this.jumpInterval = 400;
    this.x_pos = 100;      // temporary starting x_pos for demo
    this.y_pos = 100;      // temporary starting y_pos for demo
    this.x_vel = 0;     // set upper and bottom limit later
    this.y_vel = 0;     
    
    this.friction = .95
    
    this.lastFireball = Date.now() - 1000;
    this.fireballInterval = 200;

    // sprite animations:
    this.flip = false;
    // 2080 × 1816 | 5 cols and 4 rows | each sprite is 416 x 454
    this.girlRunning = new Image();
    this.girlRunning.src = './src/assets/sprites/girl/girl_running.png';
    this.currentRunningFrame = 1;
    
    // 1664 × 1816 | 4 cols and 4 rows | each sprite is 416 x 454
    this.girlIdling = new Image();
    this.girlIdling.src = './src/assets/sprites/girl/girl_idling.png';
    this.currentIdleFrame = 1;
    
    // 3606 × 2510 | 6 cols and 5 rows | each sprite is 601 x 502
    this.girlDying = new Image();
    this.girlDying.src = './src/assets/sprites/girl/girl_dying.png';
    this.currentDyingFrame = 1;
    
    // 729 × 261 | 2 cols and 1 rows | each sprite is 364.5 x 261
    this.maxHealth = difficulty;                      // Default placeholder value
    this.currentHealth = difficulty;    
    this.healthBar = new Image();
    this.healthBar.src = './src/assets/sprites/girl/heart_border.png';
    this.lastDamage = Date.now() - 1000;
    this.damageInterval = 1000;

    // 447 × 448
    this.numCoins = 0
    this.coinImg = new Image();
    this.coinImg.src = './src/assets/sprites/coin/star_coin_counter.png';
  }

  // getting starting position from sprite sheet
  getStartingPos(tileNum, frameSourceWidth, frameSourceHeight, numColSheet) {
    let row = Math.floor((tileNum - 1) / numColSheet); // Num of columns in sprite sheet
    let col = (tileNum % numColSheet) || numColSheet;
    
    let x = (col - 1) * frameSourceWidth;
    let y = row * frameSourceHeight;
    return [x, y];
  }

  draw(ctx) {
    
    if (this.currentHealth <= 0) {
      if (this.currentDyingFrame < 30) {
        this.currentDyingFrame += (10/30);
      }
      this.drawDyingSpriteAnimation(ctx, this.girlDying, this.currentDyingFrame, 601, 502, 6, 120, 100)
    } else if (Math.abs(this.x_vel) < 0.2) {
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

  drawDyingSpriteAnimation(ctx, image, frameCounter, frameSouceWidth, frameSouceHeight, numColSheet, targetWidth, targetHeight) {
    let [tileClipX,tileClipY] = this.getStartingPos(Math.floor(frameCounter), frameSouceWidth, frameSouceHeight, numColSheet)

    if (this.flip) { // flip image
      ctx.save();
      ctx.translate(this.screenX + targetWidth, this.y_pos- this.radius - 10);
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
        this.y_pos- this.radius - 10, // target y to place on the canvas
        targetWidth, // target width
        targetHeight // target height
      );
    }
  }

  // 729 × 261 | 2 cols and 1 rows | each sprite is 364.5 x 261
  drawHealth(ctx) {
    let emptyHealth = this.maxHealth - this.currentHealth;
    let firstFullHeartXPos = 20;
    
    for (let i = 0; i < this.currentHealth; i++) {
      if (i === 0) {
        ctx.drawImage(
          this.healthBar, // image
          0, // source x to start clipping
          0,  // source y to start clipping
          364.5, // source width
          261, // source height
          firstFullHeartXPos,  // target x to place on the canvas
          20, // target y to place on the canvas
          88, // target width
          64 // target height
          );
        firstFullHeartXPos += 88
      } else {
        ctx.drawImage(
          this.healthBar, // image
          0, // source x to start clipping
          0,  // source y to start clipping
          364.5, // source width
          261, // source height
          firstFullHeartXPos,  // target x to place on the canvas
          20, // target y to place on the canvas
          55, // target width
          40 // target height
          );
        firstFullHeartXPos += 55
      }
    }

    let firstEmptyHeartXPos = firstFullHeartXPos;
        
    for (let i = 0; i < emptyHealth; i++) {
      if (this.currentHealth === 0 && i === 0) {
        ctx.drawImage(
          this.healthBar, // image
          364.5, // source x to start clipping
          0,  // source y to start clipping
          364.5, // source width
          261, // source height
          firstEmptyHeartXPos,  // target x to place on the canvas
          20, // target y to place on the canvas
          88, // target width
          64 // target height
          );
          firstEmptyHeartXPos += 88
      } else {
        ctx.drawImage(
          this.healthBar, // image
          364.5, // source x to start clipping
          0,  // source y to start clipping
          364.5, // source width
          261, // source height
          firstEmptyHeartXPos,  // target x to place on the canvas
          20, // target y to place on the canvas
          55, // target width
          40 // target height
        );
      firstEmptyHeartXPos += 55
      }
    }

  }

  drawCoinCounter(ctx) {
    ctx.drawImage(this.coinImg, 105, 70, 40, 40);

    // ctx.font = "bold 30px Helvetica";
    ctx.font = "30px Montserrat";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left"

    ctx.fillStyle = "#525252";
    ctx.fillText(this.numCoins.toLocaleString('en-US'), 155, 90)
  }

  move(timeDelta) {
    const NORMAL_FRAME_TIME_DELTA = 1000000 //1200 / 60;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    // horizontal movement
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

  isCollidedWithObject(otherObject) {
    let [x1, y1] = [this.x_pos, this.y_pos]
    let [x2, y2] = [otherObject.x_pos, otherObject.y_pos]
    let rad1 = this.radius
    let rad2 = otherObject.radius;
    let dist = () => {
      return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
    }
    return (dist() < (rad1 + rad2))
  }

  collideWithObject(otherObject, level) {
    if (otherObject instanceof Coin) {
      level.remove(otherObject);
      this.numCoins += 1;
    } else if (otherObject instanceof Enemy) {
      // otherObject.relocate();

      let now = Date.now();
      let elapsed = now - this.lastDamage;
      if ((elapsed > this.damageInterval) && (this.jumpCount < 1)) {
        this.lastDamage = now - (elapsed % this.damageInterval);

        if (this.currentHealth >= 1) {
          this.currentHealth -= 1;
        } 
      }
    }
  }

  fireFireball() {
    let now = Date.now();
    let elapsed = now - this.lastFireball;

    if (elapsed > this.fireballInterval) {
      this.lastFireball = now - (elapsed % this.fireballInterval);
      let ball = new Fireball({map: this.map, pos: [this.x_pos, this.y_pos], vel: [this.x_vel, this.y_vel], camera: this.map.camera, flip: this.flip, player: this});
      this.map.fireballs.push(ball);
    }

  }
}

module.exports = Player;