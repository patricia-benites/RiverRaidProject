class Obstacle {
    constructor(argX, argY, argWidth, argHeight, image) {
      this.x = argX;
      this.y = argY;
      this.width = argWidth;
      this.height = argHeight;
      this.image = image
      this.speedY = 1;
    }
  
    move() {
        this.y += this.speedY;
        this.y %= canvas.height;
    }
  
    draw() {
      this.move();
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      
    }
}  

if (typeof module !== 'undefined') {
  module.exports = Obstacle;
}