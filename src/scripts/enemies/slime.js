const Enemy = require("./enemy");

class Slime extends Enemy {
  constructor(params) {
    super(params)

    this.radius = 20
    this.height = 40;      
    this.width = 60;   
    
    // 285 × 34 | 5 cols and 1 rows | each sprite is 57 x 34
    this.img = new Image();
    this.img.src = './src/assets/sprites/slime/blue_slime.png';

    this.spriteWidth = 57;
    this.spriteHeight = 34;
    this.spriteCols = 3; // The last two cols are for the hit animation and dead animation
    this.static = false;
    this.currentFrameFPSCounter = 1/15;

    this.x_vel = -1.5 - (.5 * Math.random()) // Add small variance to enemy speed
  }


}

module.exports = Slime;