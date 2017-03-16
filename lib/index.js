var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var Game = require('./game');
var game = new Game({canvas: canvas, context: context});

document.addEventListener('keydown', function(event) {
  if(event.keyCode === 37) {
    game.paddle.moveLeft = true;
  }
  if(event.keyCode === 39) {
    game.paddle.moveRight = true;
  }
})

document.addEventListener('keyup', function(event) {
  if(event.keyCode === 37) {
    game.paddle.moveLeft = false;
  }
  if(event.keyCode === 39) {
    game.paddle.moveRight = false;
  }
})

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.stages();
  requestAnimationFrame(gameLoop);
}

gameLoop();
