# Game Time

## Synopsis

 We were tasked with creating a working game utilizing TDD with object oriented programming principles in mind. A mid project refactor to ES6 was also implemented.

## Code Example

```javascript
class Paddle {
  constructor (board) {
    this.canvas = board.canvas;
    this.context = board.context;
    this.width = 80;
    this.height = 10;
    this.x = board.canvas.width/2 - this.width/2;
    this.y = board.canvas.height - this.height;
    this.moveRight = false;
    this.moveLeft = false;
  }

  draw () {
    this.context.fillStyle = '#2E2E3A';
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  move () {
    if (this.moveRight && this.x < this.canvas.width-this.width) {
      this.x += 7;
    } if (this.moveLeft && this.x > 0) {
      this.x -= 7;
    }
  }
}
```

## Motivation

This project is part of the Turing School of Software and Designs Front-end Engineering program for module 2.


## Tests

The game.js file houses the bulk of the game's functionality and game play. We tested to see if collision detection and boundaries were working properly. As such the ball would continue moving and collision detection would score points.

examples:

```javascript
it('should be able to detect the right boundary', () => {
  game.ball.x = 519;
  game.ball.dx = 2;
  game.detectRightBoundry();
  assert.equal(game.ball.dx, -2)
});

it('should be able to detect collisions', () => {
  game.ball.x = 30;
  game.ball.y = 80;
  game.bricks.brick[0][0].x = 20;
  game.bricks.brick[0][0].y = 60;
  assert.equal(game.bricks.brick[0][0].status, 1)
  game.collisionDetection();
  assert.equal(game.bricks.brick[0][0].status, 0)
  assert.equal(game.score, 1)
});
```

## Contributors

Jack Bevis and Jenn Peavler
