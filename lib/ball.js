class Ball {
  constructor (board, paddleHeight, paddleWidth) {
    this.canvas = board.canvas;
    this.context = board.context;
    this.paddleHeight = paddleHeight;
    this.paddleWidth = paddleWidth;
    this.radius = 5;
    this.x = board.canvas.width/2;
    this.y = board.canvas.height - this.paddleHeight - this.radius;
    this.dx = 4;
    this.dy = -4;
  }

  draw () {
    this.context.fillStyle = 'red';
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.context.fill();
    this.context.closePath();
  }

  move () {
    this.x += this.dx;
    this.y += this.dy;
  }
}


module.exports = Ball;
