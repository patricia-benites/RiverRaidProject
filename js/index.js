
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const chopperl = new Image()
chopperl.src = "../images/chopp.png"

const chopperr = new Image()
chopperr.src = "../images/chopper_r.png"

const shipl = new Image()
shipl.src = "../images/ship.png"

const shipr = new Image()
shipr.src = "../images/ship_r.png"

const plane = new Plane();
const scenario1 = new Scenario1(canvas, plane);

ctx.fillStyle = "green";
ctx.fillRect(0,0,canvas.width, canvas.height)




const shoots = [];

const obstacles = []
let frames = 0

function updateObstacles() {
  obstacles.forEach((obstacle) => {
    console.log("draw")
    obstacle.draw();
  });
  frames++;
  if (frames % 200 === 0) {
    const imageTypes = [chopperl, chopperr, shipl, shipr]
    const xPos = randomIntFromInterval(210, 540);
    const type = imageTypes[randomIntFromInterval(0,3)];
    obstacles.push(
      new Obstacle(xPos, 0, 50, 30, type))
}}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateShoots() {
  shoots.forEach((shoot) => {
      shoot.draw();
  });
}

window.onload = function () {
    document.getElementById("start-game-button").onclick = function () {
      document.getElementById("start-game-button").disabled = true;

    startGame();
    console.log('Game Started')
    };
    
  };

function startGame() {
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scenario1.draw();
      updateObstacles();
      updateShoots();
    }, 20);
  }
  

  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      plane.moveRight();
    } else if (event.code === "ArrowLeft") {
      plane.moveLeft();
    } else if (event.code === "ArrowUp") {
      const shoot = new Shoot(plane.x, plane.y, plane.width, plane.height);
      shoots.push(shoot);
    }
  });