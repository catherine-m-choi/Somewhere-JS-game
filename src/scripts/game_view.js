const Game = require("./game.js");
const Menu = require("./menu");

class GameView {
  constructor(params) {
    // this.game = new Game(params);
    this.params = params
    this.dimX = params["dim"][0];
    this.dimY = params["dim"][1];
    this.menu = new Menu(params);
    this.ctx = ctx;
    this.animateBool = true;
    this.clearScreen = false;

    this.stop = false;
    this.frameCount = 0;
    this.fps = 60;
    this.fpsInterval = 1000 / this.fps;
    
    this.mainSong = document.getElementById("main-song");
    this.mainSong.loop = true;
    this.mainSong.volume = 0.2;

    this.gameOverAudio = document.getElementById("game-over-audio");
    this.gameOverAudio.volume = 0.2;

    const playButton = document.getElementById("play-btn");
    const instructButton = document.getElementById("instructions-btn");
    const difficultyButton = document.getElementById("difficulty-btn");
    const returnMenuButton = document.getElementById("return-to-menu");
    const easyButton = document.getElementById("easy-btn");
    const mediumButton = document.getElementById("medium-btn");
    const hardButton = document.getElementById("hard-btn");
    const menuButton = document.getElementById("menu-btn");
    const volumeButton = document.getElementById("volume-btn");
    const reloadButton = document.getElementById("reload-btn");
    const yesPlayButton = document.getElementById("yes-play-btn");
    const noPlayButton = document.getElementById("no-play-btn");
    const that = this;
  
    const instructionBox = document.getElementById("instructions-text");
    instructionBox.style["background-image"] = "url(./src/assets/menu/instructions_no_banner.png)"

    const difficultyBox = document.getElementById("difficulty-select");
    difficultyBox.style["background-image"] = "url(./src/assets/menu/difficulty_banner.png)"

    playButton.addEventListener("click", function() {
      playButton.hidden = true;
      instructButton.hidden = true;
      difficultyButton.hidden = true;
      menuButton.hidden = false;
      reloadButton.hidden = false;
      that.start();
      that.playButtonAudio();
      if (that.mainSong.paused) {that.mainSong.play()}
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
      // that.game.player.maxHealth = 10;
      // that.game.player.currentHealth = 10;
      that.params["difficulty"] = 10;
      that.playButtonAudio();
    });

    mediumButton.addEventListener("click", function() {
      // that.game.player.maxHealth = 5;
      // that.game.player.currentHealth = 5;
      that.params["difficulty"] = 5;
      that.playButtonAudio();
    });

    hardButton.addEventListener("click", function() {
      // that.game.player.maxHealth = 1;
      // that.game.player.currentHealth = 1;
      that.params["difficulty"] = 1;
      that.playButtonAudio();
    });

    menuButton.addEventListener("click", function() {
      that.playButtonAudio();
      that.animateBool = false;
      that.clearScreen = true;
      that.titleMenu();
      that.clearCanvas();
      setTimeout(()=> {
        that.clearCanvas();
      }, 1001);
      menuButton.hidden = true;
      reloadButton.hidden = true;
      yesPlayButton.hidden = true;
      noPlayButton.hidden = true;
      playButton.hidden = false;
      instructButton.hidden = false;
      difficultyButton.hidden = false;
    });

    reloadButton.addEventListener("click", function() {
      that.playButtonAudio();
      this.animateBool = true;
      yesPlayButton.hidden = true;
      noPlayButton.hidden = true;
      that.start();
    });

    volumeButton.addEventListener("click", function() {
      that.playButtonAudio();
      that.toggleMainSong();
      // if (!that.gameOverAudio.paused) {that.gameOverAudio.pause();}
    });

    yesPlayButton.addEventListener("click", function() {
      that.playButtonAudio();
      this.animateBool = true;
      yesPlayButton.hidden = true;
      noPlayButton.hidden = true;
      that.start();
    });

    noPlayButton.addEventListener("click", function() {
      that.playButtonAudio();
      that.animateBool = false;
      that.clearScreen = true;
      that.titleMenu();
      that.clearCanvas();
      setTimeout(()=> {
        that.clearCanvas();
      }, 1001);
      menuButton.hidden = true;
      reloadButton.hidden = true;
      yesPlayButton.hidden = true;
      noPlayButton.hidden = true;
      playButton.hidden = false;
      instructButton.hidden = false;
      difficultyButton.hidden = false;
    });
    

    // 834 × 201 || Center x pos is (this.dimX - 834) / 2 = 223
    this.gameOverImg = new Image();
    this.gameOverImg.src = './src/assets/game_over/game_over.png';

    // 390 × 106 || Center x pos is (this.dimX - 834) / 2 = 445
    this.playAgainImg = new Image();
    this.playAgainImg.src = './src/assets/game_over/play_again.png';
  }

  clearCanvas() {
    let canvas = document.getElementById("game-canvas");
    this.ctx = canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.dimX, this.dimX);
  }

  titleMenu() {
    document.getElementById("game-canvas").style.backgroundImage="url(./src/assets/menu/title_screen_background.png)";
  }

  start() {
    this.game = new Game(this.params);
    this.then = Date.now();
    this.startTime = this.then;
    // Prob will refactor this to move this somewhere else.
    this.game.currentLevel.placeCoins(this.game.currentLevel.coinPos)
    this.animateBool = true;
    this.animate()
  }

  animate(time) {
    if(!this.animateBool) {
      if (this.clearScreen) {
        this.ctx.clearRect(0, 0, this.dimX, this.dimY);
      }
      this.ctx = null; 
      return;
    }

    requestAnimationFrame(this.animate.bind(this));

    this.now = Date.now();
    let elapsed = this.now - this.then;

    if (elapsed > this.fpsInterval) {
      this.then = this.now - (elapsed % this.fpsInterval);

      this.game.step(elapsed);
      this.game.draw(this.ctx);
      this.checkOutOfBounds();
      this.checkAlive();
    }
  }

  playButtonAudio() {
    let song = document.getElementById("button-audio");
    song.volume = 0.5;
    song.play();
  }

  toggleMainSong() {
    this.mainSong.paused ? this.mainSong.play() : this.mainSong.pause();
  };

  checkOutOfBounds() {
    if ((this.game.player.x_pos + this.game.player.width) < 0 || this.game.player.y_pos + this.game.player.radius >= this.dimY) {
      this.drawGameOver();
    }
  } 

  drawGameOver() {
    this.animateBool = false;
    this.clearScreen = false;
    this.ctx.globalAlpha = 0.3;
    this.ctx.fillRect(0,0,this.dimX,this.dimY);
    this.ctx.globalAlpha = 1.0;
    this.playGameAudio();
    
    let that = this;
    let bindCtx = this.ctx;
    setTimeout(() => {
      // center x pos 223
      bindCtx.drawImage(this.gameOverImg, 223, 120);
      // center x pos 445
      bindCtx.drawImage(this.playAgainImg, 445, 300);
      that.clearScreen = false;

      const yesPlayButton = document.getElementById("yes-play-btn");
      const noPlayButton = document.getElementById("no-play-btn");

      yesPlayButton.hidden = false;
      noPlayButton.hidden = false;
    }, 1000);
  }

  playGameAudio() {
    this.toggleMainSong();
    this.gameOverAudio.play();
    setTimeout(() => {
      this.toggleMainSong()
    }, 14000)
  }

  checkAlive() {
    let that = this;
    if (this.game.player.currentHealth <= 0 ) {
      setTimeout(()=> {
        that.drawGameOver();
      }, 1520)
      // console.log("drawing game over")
    }
  }

}

module.exports = GameView;