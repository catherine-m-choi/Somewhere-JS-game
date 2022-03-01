class MovingObject {
  constructor(params) {
    this.game = params["game"];
    this.map = params["map"]; // current level
    this.radius = 40
    this.height = this.radius*2;      
    this.width = this.radius*2;       
    this.x_pos = params["game"][0];
    this.y_pos = params["game"][1];
    this.x_vel = 0; 
    this.y_vel = 0;     
    this.friction = .95
  }

  // getting starting position from sprite sheet
  getStartingPos(tileNum, frameSouceWidth, frameSouceHeight, numColSheet) {
    let row = Math.floor((tileNum - 1) / numColSheet); // Num of columns in sprite sheet
    let col = (tileNum % numColSheet) || numColSheet;
    
    let x = (col - 1) * frameSouceWidth;
    let y = row * frameSouceHeight;
    return [x, y];
  }

  draw(ctx) {}

  drawSpriteAnimation(ctx, image, frameCounter, frameSouceWidth, frameSouceHeight, numColSheet, targetWidth, targetHeight) {}

  move(timeDelta) {
    const NORMAL_FRAME_TIME_DELTA = 1000000 //1200 / 60;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;

    this.x_pos += this.x_vel * velocityScale;
    this.x_vel *= this.friction
    this.x_pos += this.x_vel
    
    this.y_pos += this.y_vel * velocityScale;

    this.y_vel += 1.5
    this.y_vel *= this.friction
    this.y_pos += this.y_vel

    this.collideWithTile(this.x_vel, this.y_vel)
  }

  moveHorizontal(dir) {
    let [dirX, dirY] = dir
    this.x_vel +=  dirX / 150
    this.x_pos += this.x_vel
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

module.exports = MovingObject;