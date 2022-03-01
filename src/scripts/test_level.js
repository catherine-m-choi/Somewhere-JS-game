const Camera = require("./camera");

class TestLevel {
  constructor(dimX, dimY) {
    // Canvas size is 1280 x 720
    // forest_tiles.png is 896 × 384; Individual tile is 128 x 128 in source
    // 16 tiles wide and 9 tiles high, with tile size of 80 x 80
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
      0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 7, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
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
    this.tileAtlas.src = './src/assets/forest_tiles.png';

    // for camera
    this.dimX = dimX;
    this.dimY = dimY;
    this.camera = new Camera(this.cols, this.rows, this.outputSize, dimX, dimY);

    // for background rendering
    this.background = new Image();
    this.background.src = './src/assets/bg_forest.png';
    this.imgWidth = 0;
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

  renderForeground(ctx) {
    // static version. Later refactor to allow scrolling foreground with slower speed than main render layer: 

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        let tile = this.getForegroundTile(c, r);
        if (tile !== 0) { // 0 => empty tile
          let [x_pos,y_pos] = this.getStartingPos(tile)
          ctx.drawImage(
            this.tileAtlas, // image
            x_pos, 
            y_pos,
            this.sourceSize, // source width
            this.sourceSize, // source height
            c * this.outputSize,  // target x
            r * this.outputSize, // target y
            this.outputSize, // target width
            this.outputSize // target height
          );
        }
      }
    }
  }

  render(ctx) {
    let startCol = Math.floor(this.camera.cam_x / this.outputSize);
    let endCol = startCol + (this.camera.width / this.outputSize);
    let startRow = Math.floor(this.camera.cam_y / this.outputSize);
    let endRow = startRow + (this.camera.height / this.outputSize);
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
            x_pos, // source x
            y_pos, // source y
            this.sourceSize, // source width
            this.sourceSize, // source height
            Math.round(x),  // target x
            Math.round(y), // target y
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
    if (this.imgWidth == this.dimX) {
      this.imgWidth = 0;
    }

  }
}

module.exports = TestLevel;