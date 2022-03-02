const Camera = require("../camera");
const Coin = require("../collectibles/coin");
const TallTree = require("../non_interactive_objects/tall_tree")

class TestLevel {
  constructor(dimX, dimY) {
    // Canvas size is 1280 x 720
    // forest_tiles.png is 896 × 384; Individual tile is 128 x 128 in source
    // Screen is 16 tiles wide and 9 tiles high, with tile size of 80 x 80
    this.cols = 46;
    this.rows = 9;
    this.sourceSize = 128;
    this.outputSize = 80;
    this.tiles = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 16, 7, 0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 16, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13 
      ];
    this.foregroundTiles = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20
      ]

    this.inputRows = 3;
    this.inputCols = 7;
    this.tileAtlas = new Image();
    this.tileAtlas.src = './src/assets/tiles/forest_tiles.png';

    // for camera
    this.dimX = dimX;
    this.dimY = dimY;
    this.camera = new Camera(this.cols, this.rows, this.outputSize, dimX, dimY);

    // Image for background rendering
    this.background = new Image();
    this.background.src = './src/assets/backgrounds/bg_forest.png';
    this.imgWidth = 0;

    // Image for foreground rendering
    this.foreground = new Image();
    this.foreground.src = './src/assets/backgrounds/foreground_wave.png';
    this.foregroundImgWidth = 0;
    this.levelCollectibles = [
      new Coin({map: this, pos: [300,500], camera: this.camera}),
      new Coin({map: this, pos: [340,500], camera: this.camera}), 
      new Coin({map: this, pos: [380,500],  camera: this.camera}),
      new Coin({map: this, pos: [580,180],  camera: this.camera}),
      new Coin({map: this, pos: [620,180],  camera: this.camera}),
      new Coin({map: this, pos: [660,180],  camera: this.camera}),
      new Coin({map: this, pos: [820,220],  camera: this.camera}),
      new Coin({map: this, pos: [845,270],  camera: this.camera}),
      new Coin({map: this, pos: [860,320],  camera: this.camera}),
    ];
    this.backgroundObjects = [
      new TallTree({map: this, pos: [300,382], camera: this.camera}),
      new TallTree({map: this, pos: [400,370], camera: this.camera}),
      new TallTree({map: this, pos: [1050,382], camera: this.camera})
    ];
    this.enemies = [];
  }
  
  remove(obj) {
    if (obj instanceof Coin) {
      this.levelCollectibles.splice(this.levelCollectibles.indexOf(obj),1);
      obj.playAudio();
    } else if (obj instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(obj),1)
    }
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
    ctx.drawImage(this.background, this.imgWidth, -40);
    //image2
    ctx.drawImage(this.background, this.imgWidth + this.dimX, -40);
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

}

module.exports = TestLevel;