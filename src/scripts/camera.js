class Camera {
  constructor(levelCols, levelRows, levelTileSize, dimX, dimY) {
    this.cam_x = 0;
    this.cam_y = 0;
    this.width = dimX;
    this.height = dimY;
    this.maxX = levelCols * levelTileSize - dimX;
    this.maxY = levelRows * levelTileSize - dimY;
  }

  follow(player) {
    this.following = player;
    player.screenX = player.x_pos;
    player.screenY = player.y_pos;
  }

  update() {
    // player sprite should be placed at a third of the screen horizontally
    this.following.screenX = this.width / 3;
    this.following.screenY = this.height / 3;

    // Camera follows player sprite
    this.cam_x = this.following.x_pos - this.width / 3;
    this.cam_y = this.following.y_pos

    this.cam_x = Math.max(0, Math.min(this.cam_x, this.maxX));
    this.cam_y = Math.max(0, Math.min(this.cam_y, this.maxY));

    // Edges of level
    // left edge
    if (this.following.x_pos < this.width / 3) {
      this.following.screenX = this.following.x_pos - this.cam_x;
    }
    // right edge
    if (this.following.x_pos > (this.maxX + this.width / 3)) {
      this.following.screenX = this.following.x_pos - this.maxX;
    }
  }

}

export default Camera;