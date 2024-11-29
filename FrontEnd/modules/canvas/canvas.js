import conveyorController from "./conveyor/conveyor.js";
import directorController from "./director/director.js";
import workpieceController from "./workpiece/workpiece.js";

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
const redImage = new Image();
const blackImage = new Image();
const aluImage = new Image();
const capacitiveImage = new Image();
const opticalImage = new Image();
const inductiveImage = new Image();

// Source for the images
bgImage.src = "./assets/project1/bg.png";
conveyorImage.src = "./assets/project1/Conveyor.png";
endPieceImage.src = "./assets/project1/EndPiece.png";
directorImage.src = "./assets/project1/rotate.png";
redImage.src = "./assets/project1/Red.png";
blackImage.src = "./assets/project1/Black.png";
aluImage.src = "./assets/project1/Aluminium.png";
capacitiveImage.src = "./assets/project1/Capacitive.png";
opticalImage.src = "./assets/project1/Optical.png";
inductiveImage.src = "./assets/project1/Inductive.png";

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
  conveyorController(ctx, conveyorImage);
  // Draw end piece
  ctx.drawImage(endPieceImage, 852, 335);
  // Directors controller
  directorController(ctx, directorImage);
  // Workpiece controller
  workpieceController(ctx, redImage, blackImage, aluImage);
  // Sensors controller

  requestAnimationFrame(animate);
}
