import Player from "./player";
import TestLevel from "./levels/test_level";
import Forest from "./levels/forest_level"
import Desert from "./levels/desert_level";
import Snow from "./levels/snow_level";

class Game {
  constructor(params) {
    this.DIM_X = params["dim"][0];
    this.DIM_Y = params["dim"][1];
    this.levels = [
      TestLevel,
      Forest,
      Snow,
      Desert
    ]
    this.currentLevel = new this.levels[0](this.DIM_X, this.DIM_Y)
    this.currentLevelIndex = 0;
    this.player = new Player({game: this, map: this.currentLevel, difficulty: params["difficulty"]})
    this.currentLevel.camera.follow(this.player);

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
    
    let enemies = this.currentLevel.enemies;
    for (let i = 0; i < enemies.length; i++) {
      let fireballs = this.currentLevel.fireballs;
      for (let j = 0; j < fireballs.length; j++) {
        if (enemies[i] && enemies[i].isCollidedWithObject(fireballs[j])) {
          enemies[i].collideWithObject(fireballs[j], level);
        }
      }
    }
  }

}

export default Game;