// var alertMe = require('./alert-me')
//
// function alertMe () {
//   alert('alert')
// };

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let draw = () => {
  drawPaddle();
}


let drawPaddle = () => {
  let paddleWidth = 80;
  let paddleHeight = 10;
  let paddleX = canvas.width/2 - paddleWidth/2;
  let paddleY = canvas.height - paddleHeight;
  context.fillStyle = '#DE4B26';
  context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
};



draw();
