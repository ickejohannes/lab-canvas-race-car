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


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    updateCanvas();
  };
};


function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(background, 0, 0);
  ctx.drawImage(car, carPosX, carPosY, 37, 75);

  requestAnimationFrame(updateCanvas)
}


document.addEventListener("keydown", event => {
  console.log(event);
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