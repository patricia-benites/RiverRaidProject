const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const chopperl = new Image();
chopperl.src = "../images/chopp.png";

const chopperr = new Image();
chopperr.src = "../images/chopper_r.png";

const shipl = new Image();
shipl.src = "../images/ship.png";

const shipr = new Image();
shipr.src = "../images/ship_r.png";

let audio = new Audio();
audio.src = "../sounds/sounds_player_flying_normal.wav";

let shootAudio = new Audio();
shootAudio.src = "../sounds/sounds_player_shooting.wav";

let explosionAudio = new Audio();
explosionAudio.src = "../sounds/sounds_enemy_destroyed.wav";

const gameOver = new Image();
gameOver.src = "../images/game_over.png";

let plane;
let scenario;

ctx.fillStyle = "green";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let shoots = [];

let obstacles = [];
let frames = 0;
let scorePoints = 0;

function updateObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });
  frames++;
  if (frames % 150 === 0) {
    const imageTypes = [chopperl, chopperr, shipl, shipr];
    const xPos = randomIntFromInterval(210, 540);
    const type = imageTypes[randomIntFromInterval(0, 3)];
    obstacles.push(new Obstacle(xPos, 0, 50, 30, type));
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateShoots() {
  shoots.forEach((shoot) => {
    shoot.draw();
  });
}

function checkForFatalCollision() {
  const collision = obstacles.some((obstacle) => {
    return plane.collision(obstacle);
  });

  if (collision) {
    console.log("Fatal Collision");
  }

  return collision;
}

function checkForShootCollision() {
  shoots.forEach((shoot) => {
    obstacles.forEach((obstacle) => {
      const collision = shoot.collision(obstacle);
      if (collision && obstacle.shot == false) {
        explosionAudio.play();
        scorePoints += 10;
        obstacle.shot = true;
        obstacle.visible = false;
        console.log(scorePoints);
      }
    });
  });
}

window.onload = function () {
  document.getElementById("start-game-button").onclick = function () {
    document.getElementById("start-game-button").disabled = true;
    startGame();
  };
};

function startGame() {
  const leftPanel = new Obstacle(0, 0, 199, 940);
  const rightPanel = new Obstacle(601, 0, 199, 940);
  obstacles.push(leftPanel);
  obstacles.push(rightPanel);
  plane = new Plane();
  scenario = new Scenario1(canvas, plane);
  const startInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scenario.draw();
    plane.draw();
    audio.play();
    updateObstacles();
    updateShoots();
    if (checkForFatalCollision()) {
      explosionAudio.play();
      console.log("after the game");
      shoots = [];
      obstacles = [];
      frames = 0;
      scorePoints = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      scenario.draw();
      setTimeout(()=> {
        ctx.drawImage(gameOver, 0, 0, canvas.width, canvas.height);
      }, 1000);
      
      document.getElementById("start-game-button").disabled = false;
      clearInterval(startInterval);
    }
    checkForShootCollision();
  }, 20);
}

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    plane.moveRight();
  } else if (event.code === "ArrowLeft") {
    plane.moveLeft();
  } else if (event.code === "ArrowUp") {
    const shoot = new Shoot(plane.x, plane.y, plane.width, plane.height);
    shootAudio.play();
    shoots.push(shoot);
  }
});
