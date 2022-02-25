const Player = require("./player");

class Game {
  constructor(options) {
    this.DIM_X = options["dim"][0];
    this.DIM_Y = options["dim"][1];
    this.player = new Player({game: this})
    this.bullets = [];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.player.draw(ctx)
    // this.player.go(dir)
  }

  step(delta) {
    this.player.move(delta);
    console.log("stepping")
  }
  
}

module.exports = Game;