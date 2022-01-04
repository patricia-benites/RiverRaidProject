class Obstacle {
    constructor(argX, argY, argWidth, argHeight, image = null) {
      this.x = argX;
      this.y = argY;
      this.width = argWidth;
      this.height = argHeight;
      this.image = image
      this.speedY = 3;
      this.shot = false;
      this.visible = true;
    }
  
    move() {
        this.y += this.speedY;
    }
  
    draw() {
      
      if (this.image && this.visible) {
        this.move();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else if (this.visible){
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.fillRect(this.x,this.y,this.width, this.height);
      }
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
}  

if (typeof module !== 'undefined') {
  module.exports = Obstacle;
}