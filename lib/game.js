const Paddle = require('./paddle');
const Ball = require('./ball');
const Bricks = require('./bricks');

class Game {
  constructor (board) {
    this.canvas = board.canvas;
    this.context = board.context;
    this.paddle = new Paddle(board);
    this.ball = new Ball(board, this.paddle.height, this.paddle.width);
    this.bricks = new Bricks(board);
    this.bricks.store();
    this.stage = 'initiate';
    this.lives = 3;
    this.score = 0;
    this.level = 1;
    this.scoreboardHeight = 50;
  }

  stages () {
    if (this.stage === 'initiate') {
      this.draw();
    }
    if (this.stage === 'play') {
      this.draw();
      this.paddle.move();
      this.checkBoundaries();
      this.ball.move();
      this.collisionDetection();
      this.checkScore();

    }
    // if (this.stage === 'win') {
    //   this.winLevel();
    // }

  }

  draw () {
    this.paddle.draw();
    this.ball.draw();
    this.bricks.place();
    this.drawScore();
    this.drawLevel();
    this.drawLives();
  }

  checkBoundaries () {
    this.detectLeftBoundry();
    this.detectBottomBoundry();
    this.detectRightBoundry();
    this.detectTopBoundry();
  }

  detectLeftBoundry () {
    if (this.ball.x + this.ball.dx < this.ball.radius) {
      this.changeBallDirectionX();
    }
  }

  detectRightBoundry () {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius) {
      this.changeBallDirectionX();
    }
  }

  detectTopBoundry () {
    if (this.ball.y < this.scoreboardHeight + this.ball.radius) {
      this.changeBallDirectionY();
    }
  }

  detectBottomBoundry () {
    this.detectPaddle();
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      this.loseLife();
      this.startingPositions();
      this.stage = 'initiate';
      this.ball.dx = 2 + this.level*2;
      this.ball.dy = -2 - this.level*2;
    }
  }

  loseLife() {
    this.lives--;
    if(this.lives > 0) {
      $('#life-lost').toggle();
      setTimeout(function () {
        $('#life-lost').toggle()
      }, 2000);
    }
    else {
      this.loseGame();
    }

  }


  changeBallDirectionX() {
    this.ball.dx = -this.ball.dx;
  }

  changeBallDirectionY() {
    this.ball.dy = -this.ball.dy;
  }

  detectPaddle() {
    if (this.ball.y + this.ball.dy> this.canvas.height - this.paddle.height - this.ball.radius) {
      if (this.ball.x + this.ball.dx > this.paddle.x && this.ball.x + this.ball.dx < this.paddle.x + this.paddle.width) {
            this.changeBallDirectionY();
      }
    }
  }



  collisionDetection () {
    for (let c = 0; c < this.bricks.columns; c++) {
      for (let r = 0; r < this.bricks.rows; r++) {
        let b = this.bricks.brick[c][r];

        if (b.status === 1) {
          if (this.ball.x + this.ball.dx + this.ball.radius > b.x &&
             this.ball.x + this.ball.dx - this.ball.radius < b.x + this.bricks.width &&
             this.ball.y + this.ball.dy + this.ball.radius > b.y &&
             this.ball.y + this.ball.dy - this.ball.radius < b.y + this.bricks.height ) {

               this.ball.dy = -this.ball.dy;
               this.bricks.brick[c][r].status = 0;
               this.score++;
          }
        }
      }
    }
  }

  drawScore () {
    this.context.font = '16px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText('Score: ' + this.score, this.bricks.padding + 15, 30);
  }

  drawLevel () {
    this.context.font = '16px Arial';
    this.context.fillStyle = 'black';
    this.context.fillText('Level: ' + this.level, 3*this.bricks.padding + 2*this.bricks.width + 15, 30);
  }

  drawLives () {
    this.context.font = '16px Arial';
    this.context.fillStyle = 'black';
    if (this.lives >= 0) {
      this.context.fillText('Lives: ' + this.lives, 5*this.bricks.padding + 4*this.bricks.width + 15, 30);
    }
  }

  checkScore () {
    if (this.score === 25 * this.level) {
      this.winLevel();
    }
  }

  winLevel () {
    $('#level-up').toggle();
    setTimeout(function () {
      $('#level-up').toggle()
    }, 2000);
    this.level++;
    this.stage = 'initiate';
    this.bricks.store();
    this.startingPositions();
    this.paddle.width -= 5;
    this.ball.dx = 2 + this.level*2;
    this.ball.dy = -2 - this.level*2;
  }

  loseGame () {
    this.stage = 'initiate';
    this.drawLives();
    $('#final-score').toggle(100);
    $('#final-score').on('click', function() {
      document.location.reload()
    })
    // console.log('game over')
    // document.location.reload()
  }

  startingPositions () {
    this.paddle.x = this.canvas.width/2 - this.paddle.width/2;
    this.ball.x = this.canvas.width/2;
    this.ball.y = this.canvas.height - this.paddle.height - this.ball.radius;
  }

}


module.exports = Game;
