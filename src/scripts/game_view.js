const Game = require("./game.js");

class GameView {
  constructor(gameOptions) {
    this.game = new Game(gameOptions);
    this.ctx = ctx;

    this.stop = false;
    this.frameCount = 0;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
  }

  start() {
    this.then = Date.now();
    this.startTime = this.then;
    this.game.currentLevel.placeCoins(this.game.currentLevel.coinPos)
    this.animate()

    // this.lastTime = 0;
    // // start the animation
    // requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    requestAnimationFrame(this.animate.bind(this));

    this.now = Date.now();
    let elapsed = this.now - this.then;

    if (elapsed > this.fpsInterval) {
      this.then = this.now - (elapsed % this.fpsInterval);

      this.game.step(elapsed);
      this.game.draw(this.ctx);
    }
  }
}

module.exports = GameView;