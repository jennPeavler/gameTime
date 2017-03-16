var Paddle = require('./paddle')
var Ball = require('./ball')

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var paddle = new Paddle(canvas.width/2 - 40, canvas.height - 10, 80, 10, '#DE4B26');
var ball = new Ball(canvas.width/2, canvas.height - paddle.height - 5, 5, 0, Math.PI * 2, '#0A0405', 2, -2);


document.addEventListener('keydown', function(event) {
  if (event.keyCode === 39) {
    console.log('move right damnit')
    paddle.moveRight(canvas);
  }
  if (event.keyCode === 37) {
    console.log('move left damnit')
    paddle.moveLeft();
  }

});

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  paddle.draw(context);
  ball.draw(context).move().checkBoundries(canvas);
}

setInterval(draw, 10);


// requestAnimationFrame(function gameLoop() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   paddle.draw(context);
//
//
//
//   requestAnimationFrame(gameLoop);
// });

// setInterval(requestAnimationFrame(gameLoop()), 10);


//
//
//
//
//
//
//
//
//
//
//
//
//
// // // var alertMe = require('./alert-me')
// // //
// // // function alertMe () {
// // //   alert('alert')
// // // };
// //
// let canvas = document.getElementById('canvas');
// let context = canvas.getContext('2d');
//
// let paddleWidth = 80;
// let paddleHeight = 10;
// let paddleX = canvas.width/2 - paddleWidth/2;
// let paddleY = canvas.height - paddleHeight;
// let ballRadius = 5;
// let ballX = canvas.width/2;
// let ballY = canvas.height- paddleHeight - ballRadius;
// let brickWidth = 80;
// let brickHeight = 20;
// let brickPadding = 16.67;
// //moved these into drawBricks function
// // let c = 0;
// // let r = 0;
// // let brickX = (c * brickWidth) + ((c + 1) * brickPadding);
// // let brickY = (r * brickHeight) + ((r + 1) * brickPadding);
// // let brickStatus = 1;
// let ballDx = 2;
// let ballDy = -2;
// let paddleDx = 5;
// let leftPressed = false;
// let rightPressed = false;
//
// //on page load make a 2D array of brick objects
// let brick = [];
// let numBrickCol = 5;
// let numBrickRow = 5;
//
//
// document.addEventListener('keydown', function (event) {
//   if (event.keyCode === 37) {
//     leftPressed = true;
//   } else if (event.keyCode === 39) {
//     rightPressed = true;
//   }
// });
//
// document.addEventListener('keyup', function (event) {
//   if (event.keyCode === 37) {
//     leftPressed = false;
//   } else if (event.keyCode === 39) {
//     rightPressed = false;
//   };
// });
//
// let storeBricks = () => {
//   for(let c = 0; c < numBrickCol; c++) {
//     brick[c] = [];
//     for(let r = 0; r < numBrickRow; r++) {
//       brick[c][r] = {brickX: 0, brickY: 0, status: 1}
//     }
//   }
//   console.log(brick);
// }
//
// let draw = () => {
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   drawPaddle();
//   drawBall();
//   drawBricks();
//   moveBall();
//   movePaddle();
//   checkBoundaries();
//   collisionDetection();
// }
//
// let drawPaddle = () => {
//   context.fillStyle = '#DE4B26';
//   context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
// };
//
// let drawBall = () => {
//   context.beginPath();
//   context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, true);
//   context.fillStyle = '#0A0405';
//   context.fill();
// };
//
// let drawBricks = () => {
//   context.fillStyle = '#F07821';
//   for(let c = 0; c < numBrickCol; c++) {
//     for(let r = 0; r < numBrickRow; r++) {
//       if(brick[c][r].status === 1) {
//         let x = c * (brickWidth + brickPadding) + brickPadding;
//         let y = r * (brickHeight + brickPadding) + brickPadding;
//         brick[c][r].brickX = x;
//         brick[c][r].brickY = y;
//         context.fillRect(x, y, brickWidth, brickHeight);
//       }
//     }
//   }
// }
//
// let moveBall = () => {
//   ballX += ballDx;
//   ballY += ballDy;
// };
//
// let movePaddle = () => {
//   if (leftPressed && paddleX > 0) {
//     paddleX -= paddleDx;
//   } else if (rightPressed && paddleX < canvas.width - paddleWidth) {
//     paddleX += paddleDx;
//   }
// };
//
// let checkBoundaries = () => {
//   if (ballY + ballDy > canvas.height - ballRadius || ballY + ballDy < ballRadius) {
//     ballDy = -ballDy;
//   }
//   if (ballX + ballDx < ballRadius || ballX + ballDx > canvas.width - ballRadius) {
//     ballDx = -ballDx;
//   }
// };
//
// let collisionDetection = () => {
//   for (let c = 0; c < numBrickCol; c++) {
//     for (let r = 0; r < numBrickRow; r++) {
//       let b = brick[c][r];
//       if(b.status === 1) {
//         if (ballX > b.brickX && ballX < b.brickX + brickWidth) {
//           if (ballY > b.brickY && ballY < b.brickY + brickHeight) {
//             b.status = 0;
//             ballDy = -ballDy;
//           }
//         }
//       }
//     }
//   }
// }
//
//
//
//
// //function calls on page load
// storeBricks();
// setInterval(draw, 10);
