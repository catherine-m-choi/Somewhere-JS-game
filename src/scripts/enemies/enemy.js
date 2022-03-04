const Fireball = require("../fireball");
const SolidObject = require("../solid_object");

class Enemy extends SolidObject {
  constructor(params) {
    super(params)
    this.health = 3; // enemy health default
    this.lastEnemyDamage = Date.now() - 1000;
    this.fireballInterval = 800;
  }

  isCollidedWithObject(otherObject) {
    let [x1, y1] = [this.x_pos, this.y_pos]
    let [x2, y2] = [otherObject.x_pos, otherObject.y_pos]
    let rad1 = this.radius
    let rad2 = otherObject.radius;
    let dist = () => {
      return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
    }
    return (dist() < (rad1 + rad2))
  }

  collideWithObject(otherObject, level) {
    if (otherObject instanceof Fireball) {
      // For enemy damage later: 
      let now = Date.now();
      let elapsed = now - this.lastEnemyDamage;
      if (elapsed > this.fireballInterval) {
        level.remove(otherObject);
        this.lastEnemyDamage = now - (elapsed % this.fireballInterval);

        if (this.health >= 1) {
          this.health -= 1;
          console.log("fireball hit enemy, -1 damage!")
        } 
        
        if (this.health <= 0) {
          level.remove(this);
        }
      }
    }
  }
}

module.exports = Enemy;