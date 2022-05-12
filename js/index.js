const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = '../images/road.png';


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  function startGame() {
    ctx.drawImage(img, 0, 0);
  }
};
