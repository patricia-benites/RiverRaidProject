
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const fuel = new Image()
fuel.src = "../images/fuel.png"

const plane = new Plane();
const scenario1 = new Scenario1(canvas, plane);

const obstacle = new Obstacle(300,200, 30, 30, fuel)

ctx.fillStyle = "green";
ctx.fillRect(0,0,canvas.width, canvas.height)




const shoots = [];

const obstacles = []
obstacles.push(obstacle)

function updateObstacles() {
  obstacles.forEach((obstacle) => {
    console.log("draw")
    obstacle.draw();
  });
}

window.onload = function () {
    document.getElementById("start-game-button").onclick = function () {

    startGame();
    console.log('Game Started')
    };
    
  };


function startGame() {
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scenario1.draw();
      updateObstacles();
      for (shoot of shoots) {
        shoot.draw();
      }
    }, 20);
  }
  

  window.addEventListener("keydown", (event) => {
    console.log(event.code)
    if (event.code === "ArrowRight") {
      plane.moveRight();
    } else if (event.code === "ArrowLeft") {
      plane.moveLeft();
    } else if (event.code === "ArrowUp") {
      const shoot = new Shoot(plane.x, plane.y, plane.width, plane.height);
      shoots.push(shoot);
    }
  });