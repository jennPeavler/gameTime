/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	var Game = __webpack_require__(1);
	var game = new Game({ canvas, context });

	document.addEventListener('keydown', function (event) {
	  if (event.keyCode === 37) {
	    game.paddle.moveLeft = true;
	  }
	  if (event.keyCode === 39) {
	    game.paddle.moveRight = true;
	  }
	  if (game.lives > 0 && event.keyCode === 32) {
	    game.stage = 'play';
	  }
	});

	document.addEventListener('keyup', function (event) {
	  if (event.keyCode === 37) {
	    game.paddle.moveLeft = false;
	  }
	  if (event.keyCode === 39) {
	    game.paddle.moveRight = false;
	  }
	});

	function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  game.stages();
	  requestAnimationFrame(gameLoop);
	}

	gameLoop();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Paddle = __webpack_require__(2);
	const Ball = __webpack_require__(3);
	const Bricks = __webpack_require__(4);

	class Game {
	  constructor(board) {
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

	  stages() {
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
	  }

	  draw() {
	    this.paddle.draw();
	    this.ball.draw();
	    this.bricks.place();
	    this.drawScore();
	    this.drawLevel();
	    this.drawLives();
	  }

	  checkBoundaries() {
	    this.detectLeftBoundry();
	    this.detectBottomBoundry();
	    this.detectRightBoundry();
	    this.detectTopBoundry();
	  }

	  detectLeftBoundry() {
	    if (this.ball.x + this.ball.dx < this.ball.radius) {
	      this.changeBallDirectionX();
	    }
	  }

	  detectRightBoundry() {
	    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius) {
	      this.changeBallDirectionX();
	    }
	  }

	  detectTopBoundry() {
	    if (this.ball.y < this.scoreboardHeight + this.ball.radius) {
	      this.changeBallDirectionY();
	    }
	  }

	  detectBottomBoundry() {
	    this.detectPaddle();
	    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
	      this.lives--;
	      this.loseLife();
	      this.startingPositions();
	      this.stage = 'initiate';
	      this.ball.dx = 2 + this.level * 2;
	      this.ball.dy = -2 - this.level * 2;
	    }
	  }

	  loseLife() {
	    if (this.lives) {
	      $('#life-lost').toggle();
	      setTimeout(function () {
	        $('#life-lost').toggle();
	      }, 2000);
	    } else {
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
	    if (this.ball.y + this.ball.dy > this.canvas.height - this.paddle.height - this.ball.radius) {
	      if (this.ball.x + this.ball.dx > this.paddle.x && this.ball.x + this.ball.dx < this.paddle.x + this.paddle.width) {
	        this.changeBallDirectionY();
	      }
	    }
	  }

	  collisionDetection() {
	    for (let c = 0; c < this.bricks.columns; c++) {
	      for (let r = 0; r < this.bricks.rows; r++) {
	        let brickInQuestion = this.bricks.brick[c][r];
	        let nextX = this.ball.x + this.ball.dx;
	        let nextY = this.ball.y + this.ball.dy;
	        let ballRad = this.ball.radius;

	        if (brickInQuestion.status === 1) {
	          if (nextX + ballRad > brickInQuestion.x && nextX - ballRad < brickInQuestion.x + this.bricks.width && nextY + ballRad > brickInQuestion.y && nextY - ballRad < brickInQuestion.y + this.bricks.height) {
	            this.ball.dy = -this.ball.dy;
	            this.bricks.brick[c][r].status = 0;
	            this.score++;
	          }
	        }
	      }
	    }
	  }

	  drawScore() {
	    this.context.font = '16px Orbitron';
	    this.context.fillStyle = '#2E2E3A';
	    this.context.fillText('Score : ' + this.score, this.bricks.padding + 15, 30);
	  }

	  drawLevel() {
	    this.context.font = '16px Orbitron';
	    this.context.fillStyle = '#2E2E3A';
	    this.context.fillText('Level : ' + this.level, 3 * this.bricks.padding + 2 * this.bricks.width + 15, 30);
	  }

	  drawLives() {
	    this.context.font = '16px Orbitron';
	    this.context.fillStyle = '#2E2E3A';
	    if (this.lives >= 0) {
	      this.context.fillText('Lives : ' + this.lives, 5 * this.bricks.padding + 4 * this.bricks.width + 15, 30);
	    }
	  }

	  checkScore() {
	    if (this.score === 25 * this.level) {
	      this.winLevel();
	    }
	  }

	  winLevel() {
	    $('#level-up').toggle();
	    setTimeout(function () {
	      $('#level-up').toggle();
	    }, 2000);
	    this.level++;
	    this.stage = 'initiate';
	    this.bricks.store();
	    this.startingPositions();
	    this.paddle.width -= 5;
	    this.ball.dx = 2 + this.level * 2;
	    this.ball.dy = -2 - this.level * 2;
	  }

	  loseGame() {
	    this.stage = 'initiate';
	    this.drawLives();
	    $('#final-score').toggle();
	    $('#final-score').on('click', function () {
	      document.location.reload();
	    });
	  }

	  startingPositions() {
	    this.paddle.x = this.canvas.width / 2 - this.paddle.width / 2;
	    this.ball.x = this.canvas.width / 2;
	    this.ball.y = this.canvas.height - this.paddle.height - this.ball.radius;
	  }
	}

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	class Paddle {
	  constructor(board) {
	    this.canvas = board.canvas;
	    this.context = board.context;
	    this.width = 80;
	    this.height = 10;
	    this.x = board.canvas.width / 2 - this.width / 2;
	    this.y = board.canvas.height - this.height;
	    this.moveRight = false;
	    this.moveLeft = false;
	  }

	  draw() {
	    this.context.fillStyle = '#2E2E3A';
	    this.context.fillRect(this.x, this.y, this.width, this.height);
	  }

	  move() {
	    if (this.moveRight && this.x < this.canvas.width - this.width) {
	      this.x += 7;
	    }if (this.moveLeft && this.x > 0) {
	      this.x -= 7;
	    }
	  }
	}

	module.exports = Paddle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	class Ball {
	  constructor(board, paddleHeight, paddleWidth) {
	    this.canvas = board.canvas;
	    this.context = board.context;
	    this.paddleHeight = paddleHeight;
	    this.paddleWidth = paddleWidth;
	    this.radius = 5;
	    this.x = board.canvas.width / 2;
	    this.y = board.canvas.height - this.paddleHeight - this.radius;
	    this.dx = 4;
	    this.dy = -4;
	  }

	  draw() {
	    this.context.fillStyle = '#DE3C4B';
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	    this.context.fill();
	    this.context.closePath();
	  }

	  move() {
	    this.x += this.dx;
	    this.y += this.dy;
	  }
	}

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports) {

	class Bricks {
	  constructor(board) {
	    this.canvas = board.canvas;
	    this.context = board.context;
	    this.width = 80;
	    this.height = 20;
	    this.padding = 20;
	    this.topPadding = 40;
	    this.rows = 5;
	    this.columns = 5;
	    this.brick = [];
	  }

	  store() {
	    for (let c = 0; c < this.columns; c++) {
	      this.brick[c] = [];
	      for (let r = 0; r < this.rows; r++) {
	        this.brick[c][r] = { x: 0, y: 0, status: 1 };
	      }
	    }
	  }

	  place(item) {
	    this.context.fillStyle = '#F07821';
	    for (let c = 0; c < this.columns; c++) {
	      for (let r = 0; r < this.rows; r++) {
	        if (this.brick[c][r].status === 1) {
	          this.brick[c][r].x = c * (this.width + this.padding) + this.padding;
	          this.brick[c][r].y = r * (this.height + this.padding) + this.padding + this.topPadding;
	          this.context.fillRect(this.brick[c][r].x, this.brick[c][r].y, this.width, this.height);
	        }
	      }
	    }
	    // this can be done recurssively
	    // checking if the element you're itterating over is an array.
	    // if it is call the function again until you get to the element
	    // then draw the element.
	  }

	}

	module.exports = Bricks;

/***/ }
/******/ ]);