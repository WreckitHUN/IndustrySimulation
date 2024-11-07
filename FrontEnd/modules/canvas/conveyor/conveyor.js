const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const conveyorImage = new Image();
conveyorImage.src = "./modules/canvas/conveyor/conveyor.png";

conveyorImage.addEventListener("load", () => {
  ctx.drawImage(conveyorImage, 40, 0, 200, 100, 0, 0, 200, 100);
});
