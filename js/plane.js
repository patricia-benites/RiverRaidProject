class Plane {
    constructor(){
        this.x = 400;
        this.y = 850;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        const plane = new Image();
        plane.src = "../images/plane-still.png"
        ctx.drawImage(plane, this.x, this.y, this.width, this.height)
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