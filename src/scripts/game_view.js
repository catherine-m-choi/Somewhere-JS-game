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
    const difficultyButton = document.getElementById("difficulty-btn");
    const returnMenuButton = document.getElementById("return-to-menu");
    const easyButton = document.getElementById("easy-btn");
    const mediumButton = document.getElementById("medium-btn");
    const hardButton = document.getElementById("hard-btn");
    const that = this;
  
    const instructionBox = document.getElementById("instructions-text");
    instructionBox.style["background-image"] = "url(./src/assets/menu/instructions_no_banner.png)"

    const difficultyBox = document.getElementById("difficulty-select");
    difficultyBox.style["background-image"] = "url(./src/assets/menu/difficulty_banner.png)"

    playButton.addEventListener("click", function() {
      playButton.hidden = true;
      instructButton.hidden = true;
      difficultyButton.hidden = true;
      that.start();
      that.playButtonAudio();
    });

    instructButton.addEventListener("click", function() {
      playButton.hidden = true;
      instructButton.hidden = true;
      difficultyButton.hidden = true;
      instructionBox.hidden = false;
      returnMenuButton.hidden = false;
      that.playButtonAudio();
    });

    difficultyButton.addEventListener("click", function() {
      playButton.hidden = true;
      instructButton.hidden = true;
      difficultyButton.hidden = true;
      difficultyBox.hidden = false;
      returnMenuButton.hidden = false;

      easyButton.hidden = false;
      mediumButton.hidden = false;
      hardButton.hidden = false;
      that.playButtonAudio();
    });

    returnMenuButton.addEventListener("click", function() {
      playButton.hidden = false;
      instructButton.hidden = false;
      difficultyButton.hidden = false;
      difficultyBox.hidden = true;
      instructionBox.hidden = true;
      returnMenuButton.hidden = true;
      easyButton.hidden = true;
      mediumButton.hidden = true;
      hardButton.hidden = true;
      that.playButtonAudio();
    });

    easyButton.addEventListener("click", function() {
      that.game.player.maxHealth = 10;
      that.game.player.currentHealth = 10;
      that.playButtonAudio();
    });

    mediumButton.addEventListener("click", function() {
      that.game.player.maxHealth = 5;
      that.game.player.currentHealth = 5;
      that.playButtonAudio();
    });

    hardButton.addEventListener("click", function() {
      that.game.player.maxHealth = 1;
      that.game.player.currentHealth = 1;
      that.playButtonAudio();
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

  playButtonAudio() {
    let song = document.getElementById("button-audio");
    song.volume = 0.5;
    song.play();
  }
}

module.exports = GameView;