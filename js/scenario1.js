
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
    draw() {
        setInterval(() => {
            this.move();
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x,this.y,400, canvas.height);
            this.plane.draw();
          }, 200);

}
}
if (typeof module !== 'undefined') {
    module.exports = Scenario1;
  }