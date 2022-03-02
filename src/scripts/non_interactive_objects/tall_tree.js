const SolidObject = require("../solid_object");

class TallTree extends SolidObject {
  constructor(params) {
    super(params)

    this.height = this.radius*2;      
    this.width = this.radius*2;   
    
    // 128 × 192 
    this.img = new Image();
    this.img.src = './src/assets/backgrounds/forest_pack_97.png';
    this.spriteCols = 1;
    this.static = (this.spriteCols === 1);
  }
}

module.exports = TallTree;