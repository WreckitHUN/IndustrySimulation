import eventBus from "../../eventBus.js";
// Let only one workpiece to move
let disabled = false;
// Conveyor speed
let speed = 1;
// Variables for the directors and the conveyor
let conveyorOn = false;
let rotate1extended = false;
let rotate2extended = false;

// Add eventlistener to know the state of directors and conveyor
eventBus.create("conveyorOn", () => {
  conveyorOn = true;
});
eventBus.create("conveyorOff", () => {
  conveyorOn = false;
});
eventBus.create("rotate1extended", () => {
  rotate1extended = true;
});
eventBus.create("rotate1retracted", () => {
  rotate1extended = false;
});
eventBus.create("rotate2extended", () => {
  rotate2extended = true;
});
eventBus.create("rotate2retracted", () => {
  rotate2extended = false;
});

// Buttons for adding a workpiece
const redButton = document.querySelector("#red");
const blackButton = document.querySelector("#black");
const aluButton = document.querySelector("#alu");

// Create empty array for the workpieces on the system
let workpieces = [];
// Workpiece counter for each collector bin
let binCounter1 = 0;
let binCounter2 = 0;
let binCounter3 = 0;

// Create the workpiece and add it to the array
function instantiateWorkpiece(type) {
  let workpiece = createWorkpiece(type);

  workpieces.push(workpiece);
}

// Add eventlistener to the buttons
redButton.onclick = () => {
  if (disabled) return;
  instantiateWorkpiece("red");
  disabled = true;
};
blackButton.onclick = () => {
  if (disabled) return;
  instantiateWorkpiece("black");
  disabled = true;
};
aluButton.onclick = () => {
  if (disabled) return;
  instantiateWorkpiece("alu");
  disabled = true;
};

export default function workpieceController(
  ctx,
  redImage,
  blackImage,
  aluImage
) {
  // If there is no workpieces on the belt return
  if (workpieces.length === 0) return;
  // I will only move the last item
  const lastWorkpiece = workpieces[workpieces.length - 1];
  // Update the position of the last workpiece
  updatePosition(lastWorkpiece);
  // Draw all the workpieces
  workpieces.forEach((workpiece) => {
    let img = undefined;
    let [x, y] = workpiece.getPosition();
    switch (workpiece.getType()) {
      case "red":
        img = redImage;
        break;
      case "black":
        img = blackImage;
        break;
      case "alu":
        img = aluImage;
        break;
    }
    ctx.drawImage(img, x, y);
  });
}

function updatePosition(workpiece) {
  let [x, y] = workpiece.getPosition();

  // If the workpiece has moved to the bin, let it slide down
  if (y <= 275) {
    y -= speed;
    // If conveyor is on, move forward
  } else if (conveyorOn) {
    x += speed;
    // If the workpiece is right before the bin1 and director1 is extended
    if (x >= 302 && x <= 460 && rotate1extended) {
      y -= speed; // Move the workpiece up
    }
  }

  // Update the workpiece position
  workpiece.setPosition([x, y]);
}

// Function for creating a workpiece
function createWorkpiece(type) {
  const _type = type; // red, black, alu
  let posX = 0;
  let posY = 360; // Position of the conveyor

  return {
    getType: () => _type,
    getPosition: () => [posX, posY],
    setPosition: ([x, y]) => {
      posX = x;
      posY = y;
    },
  };
}
