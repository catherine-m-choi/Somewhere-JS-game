import SolidObject from "../solid_object";

class Snowman extends SolidObject {
  constructor(params) {
    super(params)

    // 128 × 128
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/snow_snowman_short.png';
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteCols = 1;
    this.static = true;
  }
}

export default Snowman;