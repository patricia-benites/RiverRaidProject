class Plane {
    constructor(){
        this.x = 400;
        this.y = 780;
        this.width = 20;
        this.height = 20;
        this.speedY = -1;
    }

    // move() {
    //     this.y += this.speedY;
    // }

    draw() {
        // ctx.clearRect(this.x, this.y, this.width, this.height);
        // this.move();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        // ctx.clearRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        this.x-=5;
    }

    moveRight() {
        this.x+=5;
    }
}



if (typeof module !== 'undefined') {
    module.exports = Plane;
  }