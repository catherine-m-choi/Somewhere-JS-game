const Camera = require("../camera");
const Coin = require("../collectibles/coin");
const Fireball = require("../fireball");
const Enemy = require("../enemies/enemy");

class Level {
  constructor(dimX, dimY) {
    // Canvas size is 1280 x 720
    // forest_tiles.png is 896 × 384; Individual tile is 128 x 128 in source
    // Screen is 16 tiles wide and 9 tiles high, with tile size of 80 x 80
    this.cols = 46;
    this.rows = 9;
    this.sourceSize = 128;
    this.outputSize = 80;

    this.levelWidth = this.cols * this.outputSize;

    this.tiles = [];
    this.foregroundTiles = []

    // for camera
    this.dimX = dimX;
    this.dimY = dimY;
    this.camera = new Camera(this.cols, this.rows, this.outputSize, dimX, dimY);

    // Coins
    this.coinPos = []
    this.levelCollectibles = [];

    // Background objects (trees, rocks, etc)
    this.backgroundObjects = [];

    // Enemies
    this.enemies = [];
    this.fireballs = [];
  }

  placeCoins(array) {
    array.forEach((subarr) => {
      let currMap = this;
      let coin = new Coin({map: currMap, pos: subarr, camera: this.camera});
      this.levelCollectibles.push(coin);
    })
  }

  remove(obj) {
    if (obj instanceof Coin) {
      this.levelCollectibles.splice(this.levelCollectibles.indexOf(obj),1);
      obj.playAudio();
    } else if (obj instanceof Fireball) {
      this.fireballs.splice(this.fireballs.indexOf(obj),1);
    } else if (obj instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(obj),1)
    }
  }

  // objects such as coins, enemies. Does NOT include background objects (trees, etc)
  allInteractiveObjects() {
    return this.levelCollectibles.concat(this.enemies);
  }

  getTile(col, row) {
    return this.tiles[row * this.cols + col];
  }
  
  getForegroundTile(col, row) {
    return this.foregroundTiles[row * this.cols + col];
  }

  getStartingPos(tileNum) {
    let row = Math.floor((tileNum - 1) / this.inputCols)
    let col = (tileNum % this.inputCols) || this.inputCols
    
    let x_pos = (col - 1) * this.sourceSize
    let y_pos = row * this.sourceSize
    return [x_pos, y_pos]
  }

  drawObjects(ctx) {
    this.levelCollectibles.forEach((ele) => {
      ele.draw(ctx);
    })
  }

  drawBackgroundObjects(ctx) {
    this.backgroundObjects.forEach((ele) => {
      ele.draw(ctx);
    })
  }

  drawEnemies(ctx) {
    this.enemies.forEach((ele) => {
      ele.draw(ctx);
      ele.x_pos += ele.x_vel;
      ele.y_pos += ele.y_vel;
    })
  }

  drawFireballs(ctx) {
    this.fireballs.forEach((ele) => {
      ele.draw(ctx);
      ele.x_pos += ele.x_vel;
    })
  }

  renderForeground(ctx) {
    let imageSpeed = 1;

    ctx.drawImage(this.foreground, this.foregroundImgWidth, this.dimY - 80);
    //image2
    ctx.drawImage(this.foreground, this.foregroundImgWidth + this.dimX, this.dimY - 80);
    this.foregroundImgWidth -= imageSpeed

    if (this.foregroundImgWidth <= -2048) {
      this.foregroundImgWidth = 0;
    }
  }

  render(ctx) {
    let startCol = Math.floor(this.camera.cam_x / this.outputSize);
    let endCol = startCol + (this.dimX / this.outputSize);
    let startRow = Math.floor(this.camera.cam_y / this.outputSize);
    let endRow = startRow + (this.dimY / this.outputSize);
    let offsetX = startCol * this.outputSize - this.camera.cam_x;
    let offsetY = startRow * this.outputSize - this.camera.cam_y;
    
    for (let c = startCol; c <= endCol; c++) {
      for (let r = startRow; r <= endRow; r++) {
        let tile = this.getTile(c, r);
        let [x_pos,y_pos] = this.getStartingPos(tile)
        
        let x = (c - startCol) * this.outputSize + offsetX;
        let y = (r - startRow) * this.outputSize + offsetY;

        if (tile !== 0) { // 0 => empty tile
          ctx.drawImage(
            this.tileAtlas, // image
            x_pos, // source x to start clipping
            y_pos, // source y to start clipping
            this.sourceSize, // source width
            this.sourceSize, // source height
            Math.round(x),  // target x to place on the canvas
            Math.round(y), // target y to place on the canvas
            this.outputSize, // target width
            this.outputSize // target height
          );
        }
      }
    }
  }

  renderBackground(ctx, playerXVel, playerXPos) {
    let imageSpeed;
    let maxX = this.cols * this.outputSize - this.dimX
    // Edges of level should not have parallax

    // left edge
    if (playerXPos < this.dimX / 3) {
      imageSpeed = 0;
    } else if (playerXPos > maxX) { // right edge
      imageSpeed = 0
    } else {
      imageSpeed = playerXVel;
    }

    //image 1
    ctx.drawImage(this.background, this.imgWidth, 0);
    //image2
    ctx.drawImage(this.background, this.imgWidth + this.dimX, 0);
    this.imgWidth -= imageSpeed
  
    // reseting the images when the first image entirely exits the screen
    if (this.imgWidth <= (-1 * this.dimX)) {
      this.imgWidth = 0;
    }
  }

  // Tested collision using pos 0, 560 (when the floor starts)
  solidTile(xPos, yPos) {
    let tileMapCol = Math.floor(xPos / this.outputSize);
    let tileMapRow = Math.floor(yPos / this.outputSize);
    let tile = this.getTile(tileMapCol, tileMapRow);

    return (tile !== 0);
  }

  getRowCol(num) {
    return Math.floor(num / this.outputSize);
  }

  getNum(num) {
    return num * this.outputSize;
  }

  checkCollisions() {
    allInteractiveObjects()
  }

}

module.exports = Level;