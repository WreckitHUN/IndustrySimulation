import conveyorController from "./conveyor/conveyor.js";
import directorController from "./director/director.js";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 1050;
const HEIGHT = 600;

canvas.width = WIDTH;
canvas.height = HEIGHT;

// Load images
const bgImage = new Image();
const conveyorImage = new Image();
const endPieceImage = new Image();
const directorImage = new Image();

// Source for the images
bgImage.src = "./assets/project1/bg.png";
conveyorImage.src = "./assets/project1/Conveyor.png";
endPieceImage.src = "./assets/project1/EndPiece.png";
directorImage.src = "./assets/project1/rotate.png";

// When everything is loaded do the animation
window.onload = () => {
  console.log("All assets are loaded");
  animate();
};

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // Draw background
  ctx.drawImage(bgImage, 0, 0);
  // Conveyor controller
  conveyorController(ctx, conveyorImage, "Q0");
  // Draw end piece
  ctx.drawImage(endPieceImage, 860, 335);
  // Directors controller
  directorController(ctx, directorImage);

  requestAnimationFrame(animate);
}
