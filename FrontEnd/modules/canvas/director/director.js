import eventBus from "../../eventBus.js";

let speed = 5;

const states = {
  state1: "off",
  state2: "off",
};

const rotates = {
  rotate1: 0,
  rotate2: 0,
};

const extend = {
  extended1: false,
  extended2: false,
};

export default function directorController(ctx, directorImage) {
  // director positions
  updatePosition(1);
  updatePosition(2);
  // Draw director1
  ctx.save(); // Original position top-left corner
  ctx.translate(360, 475);
  ctx.rotate(-(Math.PI / 180) * rotates["rotate1"]);
  ctx.drawImage(directorImage, 0, 0);
  ctx.restore();
  // Draw director2
  ctx.save();
  ctx.translate(609, 475);
  ctx.rotate(-(Math.PI / 180) * rotates["rotate2"]);
  ctx.drawImage(directorImage, 0, 0);
  ctx.restore();
}

// Connect director1 to Q1 and director2 to Q2
eventBus.create("Q1on", () => {
  states["state1"] = "on";
});
eventBus.create("Q1off", () => {
  states["state1"] = "off";
});
eventBus.create("Q2on", () => {
  states["state2"] = "on";
});
eventBus.create("Q2off", () => {
  states["state2"] = "off";
});

function updatePosition(num) {
  switch (states[`state${num}`]) {
    case "on":
      rotates[`rotate${num}`] += speed;
      break;
    case "off":
      rotates[`rotate${num}`] -= speed;
      break;
  }
  // Make sure the rotate is between 0 and 45
  rotates[`rotate${num}`] = Math.max(0, Math.min(45, rotates[`rotate${num}`]));
  // Emit a signal when fully open also when closed
  if (rotates[`rotate${num}`] >= 45) {
    // If already extended return
    if (extend[`extended${num}`]) return;
    eventBus.emit(`rotate${num}extended`);
    extend[`extended${num}`] = true;
  } else {
    // If already retracted return
    if (!extend[`extended${num}`]) return;
    eventBus.emit(`rotate${num}retracted`);
    extend[`extended${num}`] = false;
  }
}
