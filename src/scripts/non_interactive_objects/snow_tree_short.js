const SolidObject = require("../solid_object");

class SnowTreeShort extends SolidObject {
  constructor(params) {
    super(params)

    // 128 × 192
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/snow_tree_short.png';
    this.spriteWidth = 128;
    this.spriteHeight = 192;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteCols = 1;
    this.static = true;
  }
}

module.exports = SnowTreeShort;