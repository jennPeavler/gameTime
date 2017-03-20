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
	var game = new Game({ canvas: canvas, context: context });

	document.addEventListener('keydown', function (event) {
	  if (event.keyCode === 37) {
	    game.paddle.moveLeft = true;
	  }
	  if (event.keyCode === 39) {
	    game.paddle.moveRight = true;
	  }
	  if (event.keyCode === 32) {
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

	// document.addEventListener('mousemove', function(event) {
	//   var relativeX = event.clientX - canvas.offsetLeft;
	//   if(relativeX > game.paddle.width/2 && relativeX < game.canvas.width - game.paddle.width/2) {
	//     game.paddle.x = relativeX - game.paddle.width/2;
	//   }
	// })

	function gameLoop() {
	  context.clearRect(0, 0, canvas.width, canvas.height);
	  game.stages();
	  requestAnimationFrame(gameLoop);
	}

	gameLoop();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Paddle = __webpack_require__(2);
	var Ball = __webpack_require__(3);
	var Bricks = __webpack_require__(4);

	function Game(board) {
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

	Game.prototype.stages = function () {
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
	    this.checkLives();
	  }
	  if (this.stage === 'win') {
	    this.winLevel();
	  }
	  if (this.stage === 'lose') {
	    this.loseGame();
	  }
	};

	Game.prototype.draw = function () {
	  this.paddle.draw();
	  this.ball.draw();
	  this.bricks.place();
	  this.drawScore();
	  this.drawLevel();
	  this.drawLives();
	};

	Game.prototype.checkBoundaries = function () {
	  this.detectLeftBoundry();
	  this.detectBottomBoundry();
	  this.detectRightBoundry();
	  this.detectTopBoundry();
	};

	Game.prototype.detectLeftBoundry = function () {
	  if (this.ball.x + this.ball.dx < this.ball.radius) {
	    this.ball.dx = -this.ball.dx;
	  }
	};

	Game.prototype.detectRightBoundry = function () {
	  if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius) {
	    this.ball.dx = -this.ball.dx;
	  }
	};

	Game.prototype.detectBottomBoundry = function () {
	  if (this.ball.y + this.ball.dy > this.canvas.height - this.paddle.height - this.ball.radius) {
	    if (this.ball.x + this.ball.dx > this.paddle.x && this.ball.x + this.ball.dx < this.paddle.x + this.paddle.width) {
	      this.ball.dy = -this.ball.dy;
	    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
	      this.lives--;
	      this.paddle.x = this.canvas.width / 2 - this.paddle.width / 2;
	      this.ball.x = this.canvas.width / 2 - this.ball.radius + 1;
	      this.ball.y = this.canvas.height - this.paddle.height;
	      this.stage = 'initiate';
	      if (!this.lives) {
	        this.loseGame();
	      } else {
	        this.ball.draw();
	        this.ball.dx = 2 + this.level * 2;
	        this.ball.dy = -2 - this.level * 2;
	        this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
	      }
	    }
	  }
	};

	Game.prototype.detectTopBoundry = function () {
	  if (this.ball.y < this.scoreboardHeight + this.ball.radius) {
	    this.ball.dy = -this.ball.dy;
	  }
	};

	Game.prototype.collisionDetection = function () {
	  for (c = 0; c < this.bricks.columns; c++) {
	    for (r = 0; r < this.bricks.rows; r++) {
	      var b = this.bricks.brick[c][r];
	      if (b.status === 1) {
	        if (this.ball.x + this.ball.dx > b.x && this.ball.x + this.ball.dx < b.x + this.bricks.width && this.ball.y + this.ball.dy > b.y && this.ball.y + this.ball.dy < b.y + this.bricks.height) {
	          this.ball.dy = -this.ball.dy;
	          this.bricks.brick[c][r].status = 0;
	          this.score++;
	        }
	      }
	    }
	  }
	};

	Game.prototype.drawScore = function () {
	  this.context.font = '16px Arial';
	  this.context.fillStyle = 'black';
	  this.context.fillText('Score: ' + this.score, this.bricks.padding + 15, 30);
	};

	Game.prototype.drawLevel = function () {
	  this.context.font = '16px Arial';
	  this.context.fillStyle = 'black';
	  this.context.fillText('Level: ' + this.level, 3 * this.bricks.padding + 2 * this.bricks.width + 15, 30);
	};

	Game.prototype.drawLives = function () {
	  this.context.font = '16px Arial';
	  this.context.fillStyle = 'black';
	  if (this.lives >= 0) this.context.fillText('Lives: ' + this.lives, 5 * this.bricks.padding + 4 * this.bricks.width + 15, 30);
	};

	Game.prototype.checkScore = function () {
	  if (this.score === 25 * this.level) {
	    this.stage = 'win';
	  }
	};

	Game.prototype.winLevel = function () {
	  this.context.font = '36px Arial';
	  this.context.fillStyle = 'black';
	  this.context.fillText('LEVEL UP', 20, 200);

	  //setTimeout(function() {
	  ////wrap next block of code in this, but make sure you bind the this of winLevel, or try making winLevel
	  //an arrow function....
	  //},1000*20)

	  this.level++;
	  this.stage = 'initiate';
	  this.bricks.store();
	  this.paddle.x = this.canvas.width / 2 - this.paddle.width / 2;
	  this.ball.x = this.canvas.width / 2;
	  this.ball.y = this.canvas.height - this.paddle.height - this.ball.radius;
	  this.paddle.width -= 5;
	  this.ball.dx = 2 + this.level * 2;
	  this.ball.dy = -2 - this.level * 2;
	};

	Game.prototype.checkLives = function () {
	  if (this.lives < 1) {
	    this.stage = 'lose';
	  }
	};

	Game.prototype.loseGame = function () {
	  this.drawLives();
	  console.log('game over');
	  document.location.reload();
	  this.stage = 'initiate';
	};

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	function Paddle(board) {
	  this.canvas = board.canvas;
	  this.context = board.context;
	  this.width = 80;
	  this.height = 10;
	  this.x = board.canvas.width / 2 - this.width / 2;
	  this.y = board.canvas.height - this.height;
	  this.moveRight = false;
	  this.moveLeft = false;
	}

	Paddle.prototype.draw = function () {
	  this.context.fillStyle = 'black';
	  this.context.fillRect(this.x, this.y, this.width, this.height);
	};

	Paddle.prototype.move = function () {
	  if (this.moveRight && this.x < this.canvas.width - this.width) {
	    this.x += 7;
	  }if (this.moveLeft && this.x > 0) {
	    this.x -= 7;
	  }
	};

	module.exports = Paddle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function Ball(board, paddleHeight, paddleWidth) {
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

	Ball.prototype.draw = function () {
	  this.context.fillStyle = 'red';
	  this.context.beginPath();
	  this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	  this.context.fill();
	  this.context.closePath();
	};

	Ball.prototype.move = function () {
	  this.x += this.dx;
	  this.y += this.dy;
	};

	module.exports = Ball;

/***/ },
/* 4 */
/***/ function(module, exports) {

	function Bricks(board) {
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

	Bricks.prototype.store = function () {
	  for (c = 0; c < this.columns; c++) {
	    this.brick[c] = [];
	    for (r = 0; r < this.rows; r++) {
	      this.brick[c][r] = { x: 0, y: 0, status: 1 };
	    }
	  }
	};

	Bricks.prototype.place = function () {
	  this.context.fillStyle = '#F07821';
	  for (c = 0; c < this.columns; c++) {
	    for (r = 0; r < this.rows; r++) {
	      if (this.brick[c][r].status === 1) {
	        this.brick[c][r].x = c * (this.width + this.padding) + this.padding;
	        this.brick[c][r].y = r * (this.height + this.padding) + this.padding + this.topPadding;
	        this.context.fillRect(this.brick[c][r].x, this.brick[c][r].y, this.width, this.height);
	      }
	    }
	  }
	};

	module.exports = Bricks;

/***/ }
/******/ ]);