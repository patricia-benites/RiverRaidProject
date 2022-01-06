const bgImg = new Image();
bgImg.src = "../images/bar_test.png";

const indicatorsImg = new Image();
indicatorsImg.src = "../images/bar_indicators.png";

const house = new Image();
house.src = "../images/house.png";

const land = new Image();
land.src = "../images/original_game.png";

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

  draw() {
    this.move();
    ctx.fillStyle = "rgb(0,0,255)";
    ctx.fillRect(this.x, this.y, 400, this.height);
    ctx.fillRect(this.x, this.y - this.height, 400, this.height);
    ctx.drawImage(land, 0, 0, 200, this.height);
    ctx.drawImage(land, 600, 0, 400, this.height);
    ctx.drawImage(bgImg, 0, 940, canvas.width, 60);
    ctx.drawImage(indicatorsImg, 300, 950, 200, 30);
    ctx.drawImage(house, 50, this.y, 100, 100);
    ctx.drawImage(house, 700, this.y - 100, 100, 100);
  }
}

if (typeof module !== "undefined") {
  module.exports = Scenario1;
}
