function Ball(board, paddleHeight, paddleWidth) {
  this.canvas = board.canvas;
  this.context = board.context;
  this.paddleHeight = paddleHeight;
  this.paddleWidth = paddleWidth;
  this.radius = 5;
  this.x = board.canvas.width/2;
  this.y = board.canvas.height - this.paddleHeight - this.radius;
  this.dx = 2;
  this.dy = -2;
}

Ball.prototype.draw = function () {
  this.context.fillStyle = 'black';
  this.context.beginPath();
  this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
  this.context.fill();
  this.context.closePath();
}

Ball.prototype.move = function () {
  this.detectLeftBoundry();
  this.detectRightBoundry();
  this.detectBottomBoundry();
  this.detectTopBoundry();
  this.x += this.dx;
  this.y += this.dy;
}

Ball.prototype.detectLeftBoundry = function () {
  if(this.x < this.canvas.width-this.radius) {
    this.dx = this.dx;
  }
  else {
    this.dx = -this.dx;
  }
}

Ball.prototype.detectRightBoundry = function () {
  if(this.x > 0+ this.radius) {
    this.dx = this.dx;
  }
  else {
    this.dx = -this.dx;
  }
}

Ball.prototype.detectBottomBoundry = function () {
  if(this.y < this.canvas.height - this.radius) {
    this.dx = this.dx;
  }
  else {
    //need to implement loss of life and ball reset to paddle
    this.dy = -this.dy;
    return alert('man down!')


  }
}

Ball.prototype.detectTopBoundry = function () {
  if(this.y > 0 + this.radius) {
    this.dx = this.dx;
  }
  else {
    this.dy = -this.dy;
  }
}

module.exports = Ball;
