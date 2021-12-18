// const Shoot = require("./shoot");

// const Scenario1 = require("./scenario1");

// const instancePlane = require("./plane.js")
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const plane = new Plane();
const scenario1 = new Scenario1(canvas, plane);


ctx.fillStyle = "green";
ctx.fillRect(0,0,canvas.width, canvas.height)


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
      
      // plane.draw()
      console.log("function called", plane.y)
      // plane.move();
    }, 200);
  }

  window.addEventListener("keydown", (event) => {
    console.log(event.code)
    if (event.code === "ArrowRight") {
      plane.moveRight();
    } else if (event.code === "ArrowLeft") {
      plane.moveLeft();
    } else if (event.code === "ArrowUp") {
      const shoot = new Shoot(plane.x, plane.y, plane.width, plane.height);
      console.log(shoot.y)
      shoot.draw();
    }
  });