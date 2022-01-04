const bgImg = new Image();
bgImg.src = "../images/bar test.png";

const indicatorsImg = new Image();
indicatorsImg.src = "../images/bar_indicators.png";

class Scenario1 {
    constructor(canvas) {
        this.x = 200;
        this.y = 0;
        this.width = 400;
        this.height = 940;
        this.speedY = 1;
        
    }

    move() {
        this.y += this.speedY;
        this.y %= this.height;
    }

    // create_objects(x,y,w,h) {
    //     ctx.fillStyle = "green";
    //     ctx.fillRect(x, y,w,h);
    //     ctx.stroke();
    // }
    
    draw() {
        this.move();
        ctx.fillStyle = "rgb(0,0,255)";
        ctx.fillRect(this.x,this.y,400, this.height);
        ctx.fillRect(this.x,this.y - canvas.height, 400, canvas.height);
        ctx.drawImage(bgImg, 0, 940, canvas.width, 60);
        ctx.drawImage(indicatorsImg, 300, 950, 200, 30);
    }
}


if (typeof module !== 'undefined') {
    module.exports = Scenario1;
  }