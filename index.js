var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


var Game = require('./lib/game');
var game = new Game({canvas, context});

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 37) {
    game.paddle.moveLeft = true;
  }
  if (event.keyCode === 39) {
    game.paddle.moveRight = true;
  }
  if (game.lives > 0 && event.keyCode === 32) {
    game.stage = 'play';
  }
})

document.addEventListener('keyup', function(event) {
  if (event.keyCode === 37) {
    game.paddle.moveLeft = false;
  }
  if (event.keyCode === 39) {
    game.paddle.moveRight = false;
  }
})

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.stages();
  requestAnimationFrame(gameLoop);
}

gameLoop();
