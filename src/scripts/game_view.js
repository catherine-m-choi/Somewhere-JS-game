const Game = require("./game.js");
const Menu = require("./menu");

class GameView {
  constructor(gameOptions) {
    this.game = new Game(gameOptions);
    this.menu = new Menu(gameOptions);
    this.ctx = ctx;

    this.stop = false;
    this.frameCount = 0;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;

    const playButton = document.getElementById("play-btn");
    const instructButton = document.getElementById("instructions-btn");
    const optionsButton = document.getElementById("options-btn");
    const that = this;
  
    playButton.addEventListener("click", function() {
      playButton.hidden = !playButton.hidden;
      instructButton.hidden = !instructButton.hidden;
      optionsButton.hidden = !optionsButton.hidden;
      that.start();
    });

    instructButton.addEventListener("click", function() {
    });

    optionsButton.addEventListener("click", function() {
    });
  }

  titleMenu() {
    // requestAnimationFrame(this.titleMenu.bind(this));
    // this.menu.drawTitleScreen(this.ctx);
    document.getElementById("game-canvas").style.backgroundImage="url(./src/assets/menu/title_screen_background.png)";
  }

  start() {
    console.log("starting...")
    this.then = Date.now();
    this.startTime = this.then;
    // Prob will refactor this to move this somewhere else.
    this.game.currentLevel.placeCoins(this.game.currentLevel.coinPos)
    this.animate()
  }

  animate(time) {
    requestAnimationFrame(this.animate.bind(this));

    this.now = Date.now();
    let elapsed = this.now - this.then;

    if (elapsed > this.fpsInterval) {
      this.then = this.now - (elapsed % this.fpsInterval);

      this.game.step(elapsed);
      this.game.draw(this.ctx);
      // this.menu.drawTitleScreen(this.ctx);
    }
  }
}

module.exports = GameView;