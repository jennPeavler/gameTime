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
let brickWidth = 80;
let brickHeight = 20;
let brickPadding = 16.67;

let draw = () => {
  drawPaddle();
  drawBall();
  drawBricks();
}


let drawPaddle = () => {
  context.fillStyle = '#DE4B26';
  context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
};

let drawBall = () => {
  context.beginPath();
  context.arc(canvas.width/2, canvas.height- paddleHeight - ballRadius, ballRadius, 0, Math.PI * 2, true);
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
  // context.fillRect(brickPadding * 2 + brickWidth, brickPadding, brickWidth, brickHeight);
  // context.fillRect(brickPadding, brickPadding * 2 + brickHeight, brickWidth, brickHeight);
  // context.fillRect(brickPadding * 2 + brickWidth, brickPadding * 2 + brickHeight, brickWidth, brickHeight);

};

draw();
