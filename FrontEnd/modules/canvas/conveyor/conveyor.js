import eventBus from "../../eventBus.js";

let posX = 1000;
let state = "stop"; // Initial state
let speed = 1;

export default function conveyorController(ctx, conveyorImage) {
  // Conveyor position
  updatePosition();
  // Draw the conveyor
  ctx.drawImage(
    conveyorImage,
    posX,
    0,
    1000,
    conveyorImage.height,
    10,
    350,
    1000,
    conveyorImage.height
  );

  // Request the animation frame
  requestAnimationFrame(() => {
    conveyorController(ctx, conveyorImage);
  });
}

// Connect to the output Q0
eventBus.create("Q0on", () => {
  state = "forward";
});
eventBus.create("Q0off", () => {
  state = "stop";
});

function updatePosition() {
  switch (state) {
    case "forward":
      posX -= speed;
      break;
    case "backward":
      posX += speed;
      break;
    case "stop":
      // DO NOTHING
      break;
  }
  // Ensure posX stays within bounds
  if (posX <= 0 || posX >= 2000) posX = 1000;
}
