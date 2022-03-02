const SolidObject = require("../solid_object");

class Coin extends SolidObject {
  constructor(params) {
    super(params)

    this.radius = 20
    this.height = this.radius*2;      
    this.width = this.radius*2;   
    
    // 672 × 113 | 6 cols and 1 rows | each sprite is 112 x 113
    this.coinImg = new Image();
    this.coinImg.src = './src/assets/sprites/coin/spinning_coin.png';
    this.currentCoinFrame = 1;
  }

  playAudio() {
    let song = document.getElementById("coin");
    song.volume = 0.5;
    song.play();
  }
  draw(ctx) {
    if (this.currentCoinFrame <= 6) {
      this.currentCoinFrame += (3/12);
    } else {
      this.currentCoinFrame = 1;
    }
    this.drawSpriteAnimation(ctx, this.coinImg, this.currentCoinFrame, 112, 113, 6, this.width, this.height)
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
}

module.exports = Coin;