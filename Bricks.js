import Brick from './Brick.js';

class Bricks {
  constructor(rows = 3, cols = 5) {
    this.rows = rows;
    this.cols = cols;
    this.bricks = [];
    this.init();
  }

  render(ctx) {
    for (let c = 0; c < this.cols; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.bricks[c][r].render(ctx);
        }
      }
    }
  }

  init() {
    for (let c = 0; c < this.cols; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.rows; r += 1) {
        const brick = new Brick();
        brick.x = (c * (brick.width + 20)) + 20;
        brick.y = (r * (brick.height + 20)) + 20;
        this.bricks[c][r] = brick;
      }
    }
  }
}
export default Bricks;
