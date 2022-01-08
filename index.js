const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const chopperl = new Image();
chopperl.src = "./images/chopp.png";

const chopperr = new Image();
chopperr.src = "./images/chopper_r.png";

const shipl = new Image();
shipl.src = "./images/ship.png";

const shipr = new Image();
shipr.src = "./images/ship_r.png";

const fuel = new Image();
fuel.src = "./images/fuel.png";

const gameOverImage = new Image();
gameOverImage.src = "./images/game_over.png";

const youWin = new Image();
youWin.src = "./images/win.png";

let audio = new Audio();
audio.src = "./sounds/sounds_player_flying_normal.wav";

let shootAudio = new Audio();
shootAudio.src = "./sounds/sounds_player_shooting.wav";

let explosionAudio = new Audio();
explosionAudio.src = "./sounds/sounds_enemy_destroyed.wav";

let fuelAlert = new Audio();
fuelAlert.src = "./sounds/sounds_fuel_alert.wav";

let refueling = new Audio();
refueling.src = "./sounds/sounds_player_refueling.wav";

let plane;
let scenario;

let shoots = [];

let obstacles = [];
let frames = 0;
let scorePoints = 0;
let fuelLevel = 1500;

function updateObstacles() {
  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });
  frames++;
  if (frames % 100 === 0) {
    const dimensions = {
      0: [50, 30],
      1: [50, 30],
      2: [70, 30],
      3: [70, 30],
      4: [30, 40],
    };
    const imageTypes = [chopperl, chopperr, shipl, shipr, fuel];
    const xPos = randomIntFromInterval(210, 540);
    const random = randomIntFromInterval(0, 4);
    const type = imageTypes[random];
    let isFuel = false;
    if (random == 4) {
      isFuel = true;
    }
    obstacles.push(
      new Obstacle(
        xPos,
        0,
        dimensions[random][0],
        dimensions[random][1],
        type,
        isFuel
      )
    );
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
    if (obstacle.fuel == false) {
      return plane.collision(obstacle);
    }
  });

  return collision;
}

function checkForShootCollision() {
  shoots.forEach((shoot) => {
    obstacles.forEach((obstacle) => {
      const collision = shoot.collision(obstacle);
      if (collision && obstacle.shot == false && !obstacle.fuel) {
        explosionAudio.play();
        scorePoints += 10;
        obstacle.shot = true;
        obstacle.visible = false;
      }
    });
  });
}

function checkForFuel() {
  const recharge = obstacles.some((obstacle) => {
    if (obstacle.fuel == true) {
      return plane.collision(obstacle);
    }
  });

  if (recharge) {
    fuelLevel = 1500;
    refueling.play();
  }
}

function updateFuel() {
  fuelLevel -= 1;
  if (fuelLevel <= 500) {
    fuelAlert.play();
  }
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}

function showScore() {
  ctx.fillStyle = "black";
  ctx.font = "bold 30px Arial";
  ctx.fillText("Scores", 610, 100);
  ctx.fillText(scorePoints, 640, 140);
  roundedRect(ctx, 605, 60, 120, 90, 20);
}

function gameOver() {
  explosionAudio.play();

  setTimeout(() => {
    ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
  }, 2000);

  setTimeout(() => {
    scenario.draw();
    document.getElementById("start-game-button").disabled = false;
    document.getElementById("start-game-button").style.visibility = "visible";
  }, 5000);
}

function win() {
  setTimeout(() => {
    ctx.drawImage(youWin, 0, 0, canvas.width, canvas.height);
  }, 2000);

  setTimeout(() => {
    scenario.draw();
    document.getElementById("start-game-button").disabled = false;
    document.getElementById("start-game-button").style.visibility = "visible";
  }, 5000);
}

window.onload = function () {
  document.getElementById("start-game-button").onclick = function () {
    document.getElementById("start-game-button").disabled = true;
    document.getElementById("start-game-button").style.visibility = "hidden";
    startGame();
  };
};

function startGame() {
  const leftPanel = new Obstacle(0, 0, 199, 940);
  const rightPanel = new Obstacle(601, 0, 199, 940);
  shoots = [];
  obstacles = [];
  frames = 0;
  scorePoints = 0;
  fuelLevel = 1500;
  obstacles.push(leftPanel);
  obstacles.push(rightPanel);
  plane = new Plane();
  scenario = new Scenario1(canvas);
  const startInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scenario.draw();
    plane.draw();
    audio.play();
    updateObstacles();
    updateShoots();
    showScore();
    checkForFuel();
    updateFuel();
    if (checkForFatalCollision()) {
      gameOver();
      clearInterval(startInterval);
    }

    if (fuelLevel < 0) {
      gameOver();
      clearInterval(startInterval);
    }

    if (scorePoints >= 100) {
      win();
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
