import SolidObject from "../solid_object";

class Coin extends SolidObject {
  constructor(params) {
    super(params)

    this.radius = 20
    this.height = this.radius*2;      
    this.width = this.radius*2;   
    
    // 672 × 113 | 6 cols and 1 rows | each sprite is 112 x 113
    this.img = new Image();
    this.img.src = './src/assets/sprites/coin/spinning_coin.png';

    this.spriteWidth = 112;
    this.spriteHeight = 113;
    this.spriteCols = 6;
    this.static = (this.spriteCols === 1);
    this.currentFrameFPSCounter = 3/12;
  }

  playAudio() {
    let song = document.getElementById("coin-audio");
    song.volume = 0.5;
    song.play();
  }
  
}

export default Coin;