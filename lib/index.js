// var alertMe = require('./alert-me')
//
// function alertMe () {
//   alert('alert')
// };

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let paddleWidth = 80;
let paddleHeight = 10;
let paddleX = canvas.width/2 - paddleWidth/2;
let paddleY = canvas.height - paddleHeight;
let ballRadius = 5;
let ballX = canvas.width/2;
let ballY = canvas.height- paddleHeight - ballRadius;
let brickWidth = 80;
let brickHeight = 20;
let brickPadding = 16.67;
let ballDx = 2;
let ballDy = -2;
let paddleDx = 5;
let leftPressed = false;
let rightPressed = false;


document.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) {
    leftPressed = true;
  } else if (event.keyCode === 39) {
    rightPressed = true;
  }
});

document.addEventListener('keyup', function (event) {
  if (event.keyCode === 37) {
    leftPressed = false;
  } else if (event.keyCode === 39) {
    rightPressed = false;
  };
});

let draw = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawBricks();
  moveBall();
  movePaddle();
  checkBoundaries();
}

let drawPaddle = () => {
  context.fillStyle = '#DE4B26';
  context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
};

let drawBall = () => {
  context.beginPath();
  context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
  context.fillStyle = '#0A0405';
  context.fill();
};

let drawBricks = () => {
  context.fillStyle = '#F07821';
  for (c = 0; c < 5; c++) {
    for (r = 0; r < 5; r++) {
      context.fillRect((c * brickWidth) + ((c + 1) * brickPadding), (r * brickHeight) + ((r + 1) * brickPadding), brickWidth, brickHeight);
    }
  }
};

let moveBall = () => {
  ballX += ballDx;
  ballY += ballDy;
};

let movePaddle = () => {
  if (leftPressed) {
    paddleX -= paddleDx;
  } else if (rightPressed) {
    paddleX += paddleDx;
  }
};

let checkBoundaries = () => {
  if (ballY + ballDy > canvas.height - ballRadius || ballY + ballDy < ballRadius) {
    ballDy = -ballDy;
  }
  if (ballX + ballDx < ballRadius || ballX + ballDx > canvas.width - ballRadius) {
    ballDx = -ballDx;
  }
};


setInterval(draw, 10);
