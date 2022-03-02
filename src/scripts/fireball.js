const SolidObject = require("./solid_object");

class Fireball extends SolidObject {
  constructor(params) {
    super(params)

    this.radius = 10
    this.height = this.radius*2;      
    this.width = this.radius*4;   
    
    // 1100 × 124 | 5 cols and 1 rows | each sprite is 220 x 124
    this.img = new Image();
    this.img.src = './src/assets/sprites/fireball/fireball_moving.png';
    this.spriteWidth = 220;
    this.spriteHeight = 124;
    this.spriteCols = 5;
    this.static = (this.spriteCols === 1);
    this.currentFrameFPSCounter = 1/5;

    this.flip = !params["flip"];
    this.y_pos = params["pos"][1];
    if (this.flip) {
      this.x_vel = 10;
      this.x_pos = params["pos"][0] + 3 * this.radius;
    } else {
      this.x_pos = params["pos"][0] - 3 * this.radius;
      this.x_vel = -10;
    }
    this.y_vel = 0;
  }

  drawSpriteAnimation(ctx, image, frameCounter, frameSouceWidth, frameSouceHeight, numColSheet, targetWidth, targetHeight) {
    let [tileClipX,tileClipY] = this.getStartingPos(Math.floor(frameCounter), frameSouceWidth, frameSouceHeight, numColSheet)

    if (this.flip) { // flip image
      ctx.save();
      ctx.translate(this.x_pos + targetWidth + this.width, this.y_pos- this.radius);
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
        this.x_pos - this.camera.cam_x,  // target x to place on the canvas
        this.y_pos, // target y to place on the canvas
        targetWidth, // target width
        targetHeight // target height
      );
    }
  }

  
}

module.exports = Fireball;