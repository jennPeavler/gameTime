const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')
const Game = require('./Game')
const game = new Game({canvas, context})

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37:
      game.paddle.moveLeft = true
      break
    case 39:
      game.paddle.moveRight = true
      break
    case 32:
      if(game.lives > 0) {
        game.stage = 'play'
        break
      }
  }
})

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37:
      game.paddle.moveLeft = false
      break
    case 39:
      game.paddle.moveRight = false
      break
  }
})

function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.stages();
  requestAnimationFrame(gameLoop);
}

gameLoop();
