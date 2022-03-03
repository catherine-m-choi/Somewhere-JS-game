const SolidObject = require("../solid_object");

class ShortCactus extends SolidObject {
  constructor(params) {
    super(params)

    // 128 × 128
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/desert_cactus_short.png';
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteCols = 1;
    this.static = true;
  }
}

module.exports = ShortCactus;