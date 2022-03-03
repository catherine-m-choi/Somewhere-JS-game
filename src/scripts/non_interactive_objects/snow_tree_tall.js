const SolidObject = require("../solid_object");

class SnowTreeTall extends SolidObject {
  constructor(params) {
    super(params)

    // 128 × 256
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/snow_tree_tall.png';
    this.spriteWidth = 128;
    this.spriteHeight = 256;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteCols = 1;
    this.static = true;
  }
}

module.exports = SnowTreeTall;