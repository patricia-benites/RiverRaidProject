
class Scenario1 {
    constructor(canvas, plane) {
        this.x = 200;
        this.y = 0;
        this.width = 400;
        this.height = canvas.height;
        this.speedY = 1;
        this.plane = plane
    }

    move() {
        this.y += this.speedY;
    }

    create_objects(x,y,w,h) {
        ctx.fillStyle = "green";
        ctx.fillRect(x, y,w,h);
        ctx.stroke();
    }
    draw() {
        // this.move();
        this.create_objects();
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y,400, canvas.height);
        this.plane.draw();
    }
}


if (typeof module !== 'undefined') {
    module.exports = Scenario1;
  }