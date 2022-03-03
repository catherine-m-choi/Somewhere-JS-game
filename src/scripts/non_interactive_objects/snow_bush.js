const SolidObject = require("../solid_object");

class SnowBush extends SolidObject {
  constructor(params) {
    super(params)

    // 128 × 128
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/snow_bush_short.png';
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteCols = 1;
    this.static = true;
  }
}

module.exports = SnowBush;