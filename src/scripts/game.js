const Player = require("./player");
const TestLevel = require("./test_level");

// const Controller = require("./controller.js");

class Game {
  constructor(options) {
    this.DIM_X = options["dim"][0];
    this.DIM_Y = options["dim"][1];
    // this.currentLevel = new TestLevel(this.DIM_X, this.DIM_Y);
    this.currentLevel = new TestLevel(this.DIM_X, this.DIM_Y);
    this.player = new Player({game: this, map: this.currentLevel})
    this.currentLevel.camera.follow(this.player);

    this.keys = {
      'ArrowLeft' : false,
      'ArrowRight' : false,
      'a': false,
      'd': false,
      " ": false
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
    this.currentLevel.render(ctx);
    this.player.draw(ctx);
    this.currentLevel.renderForeground(ctx);
    this.executeMoves();
  }

  step(delta) {
    this.player.move(delta);
  }

  executeMoves() {
    Object.keys(this.keys).forEach(key=> {
      if (this.keys['ArrowLeft'] || this.keys["a"]) {
        this.player.updatePos([-1,0]);
      }
      if (this.keys['ArrowRight'] || this.keys["d"]) {
        this.player.updatePos([1,0])
      }
      if (this.keys[' ']) {
        this.player.jump()
      }
    })
  }
  
}

module.exports = Game;