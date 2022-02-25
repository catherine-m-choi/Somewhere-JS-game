window.addEventListener('DOMContentLoaded', (event) => {
  const Player = require("./scripts/player.js");
  const Game = require("./scripts/game.js");
  const GameView = require("./scripts/game_view.js");

  window.canvasEl = document.getElementById("game-canvas");
  window.ctx = canvasEl.getContext("2d");
  
  window.Player = Player;
  window.Game = Game;
  window.GameView = GameView;

  const gameOptions = {
    dim: [1000, 750],
  }

  const g = new GameView(gameOptions)
  g.start();
  

  console.log('DOM fully loaded and parsed');
});