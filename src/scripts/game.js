const Player = require("./player");
const TestLevel = require("./levels/test_level");

class Game {
  constructor(params) {
    this.DIM_X = params["dim"][0];
    this.DIM_Y = params["dim"][1];
    // this.currentLevel = new TestLevel(this.DIM_X, this.DIM_Y);
    this.currentLevel = new TestLevel(this.DIM_X, this.DIM_Y);
    this.player = new Player({game: this, map: this.currentLevel})
    this.currentLevel.camera.follow(this.player);
    // this.menu = new Menu({game: this})

    this.keys = {
      'ArrowLeft' : false,
      'ArrowRight' : false,
      'a': false,
      'd': false,
      " ": false,
      "j":false
    };

    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      this.keys[e.key] = true;
    });
  
    window.addEventListener("keyup", (e) => {
      e.preventDefault();
      this.keys[e.key] = false;
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.currentLevel.renderBackground(ctx, this.player.x_vel, this.player.x_pos)
    this.currentLevel.drawBackgroundObjects(ctx);
    this.currentLevel.render(ctx);
    this.currentLevel.drawEnemies(ctx);
    this.player.draw(ctx);
    this.player.drawHealth(ctx);
    this.player.drawCoinCounter(ctx);
    this.currentLevel.drawFireballs(ctx);
    this.currentLevel.renderForeground(ctx);
    this.currentLevel.drawObjects(ctx);
    this.executeMoves();
    this.checkCollisions(this.currentLevel);
  }

  step(delta) {
    this.player.move(delta);
    this.checkCollisions;
  }

  executeMoves() {
    Object.keys(this.keys).forEach(key=> {
      if (this.keys['ArrowLeft'] || this.keys["a"]) {
        this.player.moveHorizontal([-1,0]);
        this.player.flip = true;
      }
      if (this.keys['ArrowRight'] || this.keys["d"]) {
        this.player.moveHorizontal([1,0]);
        this.player.flip = false;
      }
      if (this.keys[' ']) {
        this.player.jump()
      }
      if (this.keys['j']) {
        this.player.fireFireball();
      }
    })
  }
  
  checkCollisions(level) {
    let objs = this.currentLevel.allInteractiveObjects()  // coins and enemies
    // let collectibles = this.currentLevel.levelCollectibles  // collectibles such as coins
    for (let i = 0; i < objs.length; i++) {
      if (this.player.isCollidedWithObject(objs[i])) {
        this.player.collideWithObject(objs[i], level)
      }
    }
  }
}

module.exports = Game;