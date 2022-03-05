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
    if ((this.x_pos > this.camera.cam_x - this.width) && (this.x_pos - this.width < (this.camera.cam_x + this.camera.width))) {
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
      this.drawStaticSprite(ctx, this.img, this.width, this.height);
    } else {
      if (this.currentFrame <= this.spriteCols) {
        this.currentFrame += this.currentFrameFPSCounter;
      } else {
        this.currentFrame = 1;
      }
      this.drawSpriteAnimation(ctx, this.img, this.currentFrame, this.spriteWidth, this.spriteHeight, this.spriteCols, this.width, this.height);
    }
  }
  

}

export default SolidObject;