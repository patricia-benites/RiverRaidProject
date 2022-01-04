class Shoot {
    constructor(planeX, planeY, planeWidth, planeHeight){
        this.x = Math.floor(planeX + (planeWidth/2));
        this.y = Math.floor(planeY + (planeHeight/2));
        this.width = 5;
        this.height = 8;
        this.speedY = -8;
    }

    shoot() {
        this.y += this.speedY;
    }

    draw() {
        
        this.shoot();
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

   
}



if (typeof module !== 'undefined') {
    module.exports = Shoot;
  }