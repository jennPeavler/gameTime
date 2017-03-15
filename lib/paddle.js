function Paddle (x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
};

Paddle.prototype.draw = function (context) {
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height,);
  return this;
};

Paddle.prototype.moveRight = function (canvas) {
  console.log(this.width)
  if (this.x < canvas.width - this.width) {
    this.x += 10;
  };
  return this;
};

Paddle.prototype.moveLeft = function () {
  if (this.x > 0) {
    this.x -= 10;
  };
  return this;
};


module.exports = Paddle;
