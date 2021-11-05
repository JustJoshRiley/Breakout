import Sprite from './Sprite.js';

class Brick extends Sprite {
  constructor(x = 0, y = 0, width = 75, height = 20, color = '#f0f') {
    super(x, y, width, height, color);
    this.status = 1;
  }
}

export default Brick;
