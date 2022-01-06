class Plane {
  constructor() {
    this.x = 400;
    this.y = 850;
    this.width = 50;
    this.height = 50;
  }

  draw() {
    const plane = new Image();
    plane.src = "../images/plane-still.png";
    ctx.drawImage(plane, this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.x -= 10;
  }

  moveRight() {
    this.x += 10;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  collision(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
    );
  }
}

if (typeof module !== "undefined") {
  module.exports = Plane;
}
