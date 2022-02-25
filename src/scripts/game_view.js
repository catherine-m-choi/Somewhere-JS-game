const Game = require("./game.js");
const Keymaster = require("./keymaster.js");

class GameView {
  constructor(gameOptions) {
    this.game = new Game(gameOptions);
    this.ctx = ctx;
  }

  start() {
    // setInterval(() => {
    //   this.game.draw(this.ctx);
    // }, 1000)

    this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    console.log("start the animation")
    requestAnimationFrame(this.animate.bind(this));
  }

  bindKeyHandlers() {
    key('a', () => this.game.player.updatePos([-1,0]) ); // left
    key('d', () => this.game.player.updatePos([1,0]) );  // right
    key('space', () => this.game.player.jump() );// jump?
    // key('w', () => this.game.player.go([0,-1]) );
    // key('f', () => this.game.fireBullet() );    // attack?
    // key('s', () => this.game.player.go([0,1]) );
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
  
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;
    console.log("animating")
  
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = GameView;