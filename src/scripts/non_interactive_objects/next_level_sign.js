import SolidObject from "../solid_object";

class NextLevelSign extends SolidObject {
  constructor(params) {
    super(params)

    // 128 × 172
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/next_level_sign.png';
    this.spriteWidth = 128;
    this.spriteHeight = 172;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.spriteCols = 1;
    this.static = true;
  }
}

export default NextLevelSign;