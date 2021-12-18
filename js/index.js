
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const plane = new Plane();
const scenario1 = new Scenario1(canvas, plane);

ctx.fillStyle = "green";
ctx.fillRect(0,0,canvas.width, canvas.height)

const shoots = [];

window.onload = function () {
    document.getElementById("newGame").onclick = function () {

    startGame();
    console.log('Game Started')
    };
    
  };


function startGame() {
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scenario1.draw();
      scenario1.create_objects();
      console.log("function called", plane.y)
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
      shoot.draw();
    }
  });