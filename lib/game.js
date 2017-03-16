var Paddle = require('./paddle');
var Ball = require('./ball');
var Bricks = require('./bricks');

function Game(board) {
  this.canvas = board.canvas;
  this.context = board.context;
  this.paddle = new Paddle(board);
  this.ball = new Ball(board, this.paddle.height, this.paddle.width);
  this.bricks = new Bricks(board);
  this.lives = 3;
  this.bricks.store();
}

Game.prototype.stages = function () {
  //draw
  this.paddle.draw();
  this.paddle.move();
  this.ball.draw();
  this.checkBoundaries();
  this.ball.move();
  // this.bricks.store();
  this.bricks.place();
  this.collisionDetection();
}

Game.prototype.checkBoundaries = function () {
  this.detectLeftBoundry();
  this.detectBottomBoundry();
  this.detectRightBoundry();
  this.detectTopBoundry();
}

Game.prototype.detectLeftBoundry = function () {
  if(this.ball.x + this.ball.dx < this.canvas.width-this.ball.radius) {
    this.ball.dx = this.ball.dx;
  }
  else {
    this.ball.dx = -this.ball.dx;
  }
}

Game.prototype.detectRightBoundry = function () {
  if(this.ball.x + this.ball.dx > 0 + this.ball.radius) {
    this.ball.dx = this.ball.dx;
  }
  else {
    this.ball.dx = -this.ball.dx;
  }
}

Game.prototype.detectBottomBoundry = function () {
  if(this.ball.y + this.ball.dy > this.canvas.height - this.paddle.height - this.ball.radius) {
    if (this.ball.x + this.ball.dx > this.paddle.x && this.ball.x + this.ball.dx < this.paddle.x + this.paddle.width) {
      this.ball.dy = -this.ball.dy;
    }
    else {
      this.lives--;
      console.log('live = ' + this.lives);
      if (!this.lives) {
        console.log('game over')
        document.location.reload()
      }
      else {
        this.ball.draw();
        this.ball.dx = 4;
        this.ball.dy = -4;
        this.paddle.x = (this.canvas.width - this.paddle.width)/2;
      }
    }
  }
}


Game.prototype.detectTopBoundry = function () {
  if(this.ball.y > 0 + this.ball.radius) {
    this.ball.dx = this.ball.dx;
  }
  else {
    this.ball.dy = -this.ball.dy;
  }
}

Game.prototype.collisionDetection = function() {
  for(c = 0; c < this.bricks.c; c++) {
    for(r = 0; r < this.bricks.r; r++) {
      var b = this.bricks.brick[c][r];
      if(b.status === 1) {
        if(this.ball.x + this.ball.dx > b.x && this.ball.x + this.ball.dx < b.x + this.bricks.width && this.ball.y + this.ball.dy > b.y && this.ball.y + this.ball.dy < b.y + this.bricks.height ) {
          this.ball.dy = -this.ball.dy;
          this.bricks.brick[c][r].status = 0;
        }
      }
    }
  }
}










module.exports = Game;
