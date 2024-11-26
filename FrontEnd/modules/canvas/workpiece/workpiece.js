import eventBus from "../../eventBus.js";
// Let only one workpiece to move
let disabled = false;
// Conveyor speed
let speed = 1;
let posYminValue = 0;
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
let binCounters = {
  bin1: 0,
  bin2: 0,
  bin3: 0,
};

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
    switch (true) {
      case x >= 302 && x <= 460: // bin1
        // The workpiece is getting into bin1
        binController("bin1", workpiece, y);

        break;
      case x >= 552 && x <= 705: // bin2
        // The workpiece is getting into bin2
        binController("bin2", workpiece, y);
        break;
      case x >= 805 && x <= 974: // bin3
        // The workpiece is getting into bin3
        binController("bin3", workpiece, y);
        break;
    }
  } else if (conveyorOn) {
    x += speed;

    // If the workpiece is right before bin1 and director1 is extended
    if (x >= 302 && x <= 460 && rotate1extended) {
      y -= speed; // Move the workpiece up
      if (x > 386) x = 386;
    }
    // If the workpiece is right before bin2 and director2 is extended
    else if (x >= 552 && x <= 705 && rotate2extended) {
      y -= speed; // Move the workpiece up
      if (x > 636) x = 636;
    }
    // If the workpiece is right before bin3
    else if (x >= 805) {
      y -= speed; // Move the workpiece up
      if (x > 889) x = 889;
    }
  }
  // Don't let the workpiece pass the min y
  if (y < posYminValue) y = posYminValue;
  // Update the workpiece position
  workpiece.setPosition([x, y]);
}

// Function for creating a workpiece
function createWorkpiece(type) {
  const _type = type; // red, black, alu
  let posX = 0;
  let posY = 360; // Position of the conveyor on the Y axis
  let enabled = true;

  return {
    enabled,
    getType: () => _type,
    getPosition: () => [posX, posY],
    setPosition: ([x, y]) => {
      posX = x;
      posY = y;
    },
  };
}

function binController(bin, workpiece, y) {
  // The workpiece is getting into bin1
  switch (true) {
    case binCounters[bin] === 0 && workpiece.enabled:
      posYminValue = 32;
      if (y <= posYminValue) {
        workpiece.enabled = false;
        binCounters[bin] += 1;
        disabled = false;
      }
      break;
    case binCounters[bin] === 1 && workpiece.enabled:
      posYminValue = 132;
      if (y <= posYminValue) {
        workpiece.enabled = false;
        binCounters[bin] += 1;
        disabled = false;
      }
      break;
    case binCounters[bin] === 2 && workpiece.enabled:
      posYminValue = 232;
      if (y <= posYminValue) {
        workpiece.enabled = false;
        binCounters[bin] += 1;
        disabled = true;
      }
      break;
  }
}
