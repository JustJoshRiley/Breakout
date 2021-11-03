import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Bricks from './Bricks.js';
import GameLabel from './GameLabel.js';

const canvas = document.getElementById('Canvas');
const ctx = canvas.getContext('2d');

const paddleYStart = canvas.height - 10;
const paddleXStart = (canvas.width - 75) / 2;

class Game {
  constructor() {
    this.ball = new Ball(240, 440, 2, -2, 10, 'green');
    this.paddle = new Paddle(paddleXStart, paddleYStart);
    this.bricks = new Bricks();
    this.scoreLabel = new GameLabel('Score', 8, 20);
    this.livesLabel = new GameLabel('Lives', canvas.width - 65, 20);

    this.leftkeypressed = false;
    this.rightkeypressed = false;

    this.setup();

    this.draw();
  }

  setup() {
    this.livesLabel.value = 3;
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    this.interval = setInterval(this.draw.bind(this), 10);
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.cols; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (this.ball.x > brick.x
             && this.ball.x < brick.x + brick.width
             && this.ball.y > brick.y
             && this.ball.y < brick.y + brick.height) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.rows * this.bricks.cols) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
              clearInterval(this.interval);
            }
          }
        }
      }
    }
  } // collision detection end

  move() {
    if (this.rightkeypressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7);
    } else if (this.leftkeypressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7);
    }
  }

  collisionWithCanvasAndPaddle() {
    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
        || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.livesLabel.value -= 1;
        if (this.livesLabel.value < 1) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.x = canvas.width / 2;
          this.ball.y = canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = (canvas.width - this.paddle.width) / 2;
        }
      }
    }
  }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightkeypressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftkeypressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightkeypressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftkeypressed = false;
    }
  }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - 75 / 2);
    }
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.collisionDetection();
    this.collisionWithCanvasAndPaddle();
    this.move();
    this.ball.move();
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.livesLabel.render(ctx);
  }
}
export default Game;
