window.addEventListener('DOMContentLoaded', (event) => {
  const GameView = require("./scripts/game_view.js");
  window.GameView = GameView;

  window.canvasEl = document.getElementById("game-canvas");
  window.ctx = canvasEl.getContext("2d");

  const gameOptions = {
    dim: [1280, 720],
  }

  const g = new GameView(gameOptions)
  g.titleMenu();
  // g.start();

  document.getElementById("temp-song").loop = true;
  document.addEventListener('play', function(element){
    let song = document.getElementById("temp-song");
    song.volume = 0.1;
    song.play();
  }, true);

  document.addEventListener('pause', function(element){
    let song = document.getElementById("temp-song");
    song.pause();
  }, true);


});