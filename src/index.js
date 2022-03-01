window.addEventListener('DOMContentLoaded', (event) => {
  // for testing in console
  const Player = require("./scripts/player.js");
  const Game = require("./scripts/game.js");
  const GameView = require("./scripts/game_view.js");
  const TestLevel = require("./scripts/test_level.js");
  const Camera = require("./scripts/camera.js");

  window.canvasEl = document.getElementById("game-canvas");
  window.ctx = canvasEl.getContext("2d");
  canvasEl.style.background = "url('./src/assets/bg_forest.png')"
  
  // for testing in console
  window.Player = Player;
  window.Game = Game;
  window.GameView = GameView;
  window.TestLevel = TestLevel;
  window.Camera = Camera;

  const gameOptions = {
    dim: [1280, 720],
  }

  const g = new GameView(gameOptions)
  g.start();

});