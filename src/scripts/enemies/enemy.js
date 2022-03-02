const SolidObject = require("../solid_object");

class Enemy extends SolidObject {
  constructor(params) {
    super(params)
    this.health = 3; // enemy health default
  }

}

module.exports = Enemy;