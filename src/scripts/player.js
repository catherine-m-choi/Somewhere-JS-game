class Player {
  constructor(params) {
    this.game = params["game"];
    this.map = params["map"]; // current level
    this.radius = 40
    this.height = this.radius*2;      
    this.width = this.radius*2;       
    this.jumping = false;   // For checking jump. If currently jumping, cannot jump again/
    this.jumpCount = 0;    // For adding in double jump. If
    this.x_pos = 100;      // temporary starting x_pos for demo
    this.y_pos = 100;      // temporary starting y_pos for demo
    this.x_vel = 0;     // set bottom limit later; set upper limit later
    this.y_vel = 0;     

    this.friction = .95

    this.tempGirl = new Image();
    this.tempGirl.src = './src/assets/temp_girl_sprite.png';
  }

  draw(ctx) {
    ctx.drawImage(this.tempGirl, this.screenX,this.y_pos- this.radius, this.width, this.height );
    this.map.camera.update();
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

    // Placeholder for actual collision detection
    // Stop from going through bottom of screen. 
    // Refactor this later to check for collission detection and sit on top of tiles

    // if (this.y_pos > this.game.DIM_Y - (this.radius) - 80) {
    //   this.y_pos = this.game.DIM_Y - this.radius - 80; // 160 is two tiles. 
    //   this.y_vel = 0;
    //   this.jumping = false;
    //   this.jumpCount = 0;
    // }
    
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
    if (this.jumpCount <= 1) {
      this.y_vel -= 17 ;
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
    this.map.solidTile(left, top) ||
    this.map.solidTile(right, top) ||
    this.map.solidTile(right, bottom) ||
    this.map.solidTile(left, bottom);
    
    // console.log(collision)
    // console.log(left)
    // console.log(right)
    // console.log(top)
    // console.log(bottom)
    console.log(this.x_pos)

    if (collision) { 
      
      // Going down into tile
      if (dirY > 0) {
        let row = this.map.getRowCol(bottom);
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