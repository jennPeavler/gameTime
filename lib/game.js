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
}

Game.prototype.stages = function () {
  //draw
  this.paddle.draw();
  this.paddle.move();
  this.ball.draw();
  this.checkBoundaries();
  this.ball.move();
  this.bricks.store();
  this.bricks.place();
  // this.paddleBallCollision();
  // this.loseLife()
  //lose game
  // if (!this.lives) {
  //   alert ('Game Over')
  //   }
}


// Game.prototype.paddleBallCollision = function () {
// //determine if ball is not between paddleWidth + 2ballRadius - end life!!!!
//   if (this.ball.x > this.paddle.x - this.ball.radius && this.ball.x < this.paddle.x + this.paddle.width + 2 * this.ball.radius) {
//     if (this.ball.y > this.paddle.y - this.ball.radius && this.ball.y < this.paddle.y + this.paddle.height + this.ball.radius) {
//       this.ball.dy = -this.ball.dy;
//     }
//   }
// };


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
  if(this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
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

// Game.prototype.loseLife = function () {
//   if (this.ball.y === this.canvas.height - this.ball.radius) {
//     this.lives--;
//     this.ball.dx = 0;
//     console.log(this.lives)
//     this.ball.draw()
//   }
// };








module.exports = Game;
