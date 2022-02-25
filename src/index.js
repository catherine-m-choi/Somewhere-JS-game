window.addEventListener('DOMContentLoaded', (event) => {
  const Player = require("./scripts/player.js");
  const Game = require("./scripts/game.js");
  const GameView = require("./scripts/game_view.js");
  const TestLevel = require("./scripts/test_level.js");

  window.canvasEl = document.getElementById("game-canvas");
  window.ctx = canvasEl.getContext("2d");
  canvasEl.style.background = "url('/src/assets/bg_forest.png')"
  
  window.Player = Player;
  window.Game = Game;
  window.GameView = GameView;
  window.TestLevel = TestLevel;

  // const forestTiles = new Image();
  // forestTiles.src = '/src/assets/forest_tiles.png';
  // forestTiles.addEventListener('load', function() {
  //   ctx.drawImage(forestTiles, 0,0);
  // }, false);
  
  // const forestBackground = new Image();
  // forestBackground.src = '/src/assets/bg_forest.png';
  // forestBackground.addEventListener('load', function() {
  //   ctx.drawImage(forestBackground, 0,0);
  // }, false);

  const gameOptions = {
    dim: [1280, 720],
  }

  const g = new GameView(gameOptions)
  g.start();
  window.g = g;

  console.log('DOM fully loaded and parsed');
});