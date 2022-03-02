const NonSolidObject = require("../nonsolid_object");

class TallTree extends NonSolidObject {
  constructor(params) {
    super(params)

    this.height = this.radius*2;      
    this.width = this.radius*2;   
    
    // 128 × 192 
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/forest_pack_97.png';
    this.currentCoinFrame = 1;
  }

  draw(ctx) {
    if (this.currentCoinFrame <= 6) {
      this.currentCoinFrame += (3/12);
    } else {
      this.currentCoinFrame = 1;
    }
    
    // this.drawSpriteAnimation(ctx, this.Img, this.currentCoinFrame, 128, 192, 6, this.width, this.height)
    ctx.drawImage(
      this.img, // image
      this.x_pos - this.camera.cam_x,  // target x to place on the canvas
      this.y_pos, // target y to place on the canvas
      128, // target width
      192 // target height
    );
  }
  
  drawSpriteAnimation(ctx, image, frameCounter, frameSouceWidth, frameSouceHeight, numColSheet, targetWidth, targetHeight) {
    let [tileClipX,tileClipY] = this.getStartingPos(Math.floor(frameCounter), frameSouceWidth, frameSouceHeight, numColSheet)
    if ((this.x_pos > this.camera.cam_x) && (this.x_pos < (this.camera.cam_x + this.camera.width))) {
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
}

module.exports = TallTree;