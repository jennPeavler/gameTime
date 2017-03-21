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
    this.context.fillStyle = 'black';
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

module.exports = Paddle;
