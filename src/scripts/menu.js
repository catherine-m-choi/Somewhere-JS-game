class Menu {
  constructor(params) {
    this.dimX = params["dim"][0];
    this.dimY = params["dim"][0];
    this.ctx = ctx;

    this.titleBackground = new Image();
    this.titleBackground.src = './src/assets/backgrounds/bg_forest.png';

    this.girlTitle = new Image();
    this.girlTitle.src = './src/assets/menu/girl_title.png';

    this.titleLogo = new Image();
    this.titleLogo.src = './src/assets/menu/title_logo_pink.png';

    this.titleTagline = new Image();
    this.titleTagline.src = './src/assets/menu/title_tag_line.png';

    this.instructions = new Image();
    this.instructions.src = './src/assets/menu/instructions.png'
  }

  drawTitleScreen(ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.drawImage(this.titleBackground, 0, 0);
    ctx.drawImage(this.girlTitle, 90, 125);
    ctx.drawImage(this.titleLogo, this.dimX * .45, 100);
    ctx.drawImage(this.titleTagline, this.dimX * .52, 200);
  }

  showInstructions() {
    const instructionBox = document.getElementById("instructions-text");
    instructionBox.style["background-image"] = "url(./src/assets/menu/instructions.png)";
    instructionBox.style.zIndex = "1000";
  }

  hideInstructions() {
    const instructionBox = document.getElementById("instructions-text");
    instructionBox.style["background-image"] = "url(./src/assets/menu/instructions.png)"
    instructionBox.style.zIndex = "-1000"
    instructionBox.hidden = !instructionBox.hidden;
  }

}

module.exports = Menu;