import conveyorController from "./conveyor/conveyor.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 1050;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Load images
const bgImage = new Image();
const conveyorImage = new Image();

bgImage.src = "./assets/project1/bg.png";
conveyorImage.src = "./assets/project1/Conveyor.png";

// When everything is loaded
window.onload = () => {
  console.log("All assets are loaded");
  animate();
};

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // Draw background
  ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height);
  // Conveyor controller
  conveyorController(ctx, conveyorImage);
}
