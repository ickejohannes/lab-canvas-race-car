const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = '../images/road.png';
const car = new Image();
car.src = "../images/car.png"

const carInitialPosX = 120;
const carInitialPosY = 330;
let carPosX = carInitialPosX;
let carPosY = carInitialPosY;
const carHeight = 75;
const carWidth = 37;
let score = 0;
let isGameover = false;
let obstacleSpeed = 1;
let obstacleFrequency = 2000;
let gameLevel = 1;

let obstacleArray = [];
let numberOfObstaclesSinceLastSpeedIncrease = 0;


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    start();
  };
};

function start() {
  new Audio("../Knight-Rider-Theme-Song.mp3").play()
  intervalID = setInterval(createObstacle, obstacleFrequency);
  updateCanvas();
}

class Obstacle {
  constructor(xPos) {
    this.obsXPos = xPos
  };
  obsYPos = 0;
  obsHeight = 60;
  obsWidth = 30;
}

function createObstacle() {
  obstacleArray.push(new Obstacle(Math.random() * 250));
  score += 1;
  numberOfObstaclesSinceLastSpeedIncrease += 1;
}

function checkForCollision(obstacle) {
  if ((obstacle.obsYPos+obstacle.obsHeight) > carInitialPosY && (obstacle.obsYPos+obstacle.obsHeight) < (carInitialPosY + carHeight)) {
    if ((obstacle.obsXPos+obstacle.obsWidth) > carPosX && (obstacle.obsXPos+obstacle.obsWidth) < (carPosX + carWidth)) {
      isGameover = true;
    }
  }
}


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(car, carPosX, carPosY, carWidth, carHeight);

  for (iterator = 0; iterator < obstacleArray.length; iterator += 1){
    ctx.fillRect(obstacleArray[iterator].obsXPos, obstacleArray[iterator].obsYPos, obstacleArray[iterator].obsWidth, obstacleArray[iterator].obsHeight);
    obstacleArray[iterator].obsYPos += obstacleSpeed;

    checkForCollision(obstacleArray[iterator]);
  }

  ctx.font = '30px Arial';
  ctx.fillText(`Score: ${score}`, 300, 40);

  if (numberOfObstaclesSinceLastSpeedIncrease > 10*gameLevel) {
    obstacleSpeed *= 1.5;
    clearInterval(intervalID)
    obstacleFrequency /= 1.5;
    setInterval(createObstacle, obstacleFrequency)
    numberOfObstaclesSinceLastSpeedIncrease = 0;
    gameLevel += 1;
  }

  if (isGameover) {
    ctx.fillText("GAME OVER!", 300, 140);
  }
  
  if(!isGameover){
    requestAnimationFrame(updateCanvas)
  }
}


document.addEventListener("keydown", event => {
  if (event.key == "ArrowLeft") {
    moveCarToTheLeft();
  };

  if (event.key == "ArrowRight") {
    moveCarToTheRight();
  };
});


function moveCarToTheLeft() {
  if (carPosX <= 10) return;
  carPosX -= 10;
}

function moveCarToTheRight() {
  if (carPosX >= 235) return;
  carPosX += 10;
}