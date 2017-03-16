function Ball(x, y, radius, startAngle, endAngle, color, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.color = color;
  this.dx = dx;
  this.dy = dy;
}

Ball.prototype.draw = function(context) {
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, true);
  context.fill();
  return this;
}


Ball.prototype.move = function() {
  this.x += this.dx;
  this.y += this.dy;
  return this;
}

Ball.prototype.checkBoundries = function(canvas) {
  if(this.x + this.dx < this.radius || this.x + this.dx > canvas.width - this.radius) {
    this.dx = -this.dx;
  }
  if(this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
    this.dy = -this.dy;
  }
}





module.exports = Ball;
