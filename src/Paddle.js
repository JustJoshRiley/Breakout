class Paddle {
  constructor(x, y, width = 75, height = 10, color = 'cornflowerblue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx) {
    this.x += dx;
  }

  moveTo(x) {
    this.x = x;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
export default Paddle;
