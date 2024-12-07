import eventBus from "../eventBus.js";
import createInput from "./inputEvent.js";

// Create the 7 inputs from 0 to 6
export const inputs = [];
[...Array(7)].forEach((e, i) => {
  let input = createInput(i, 0);
  inputs.push(input);
});

document.querySelector("#I0").addEventListener("mousedown", () => {
  inputs[0].value = 1;
  eventBus.emit("changeInput", inputs[0]);
});

document.querySelector("#I0").addEventListener("mouseup", () => {
  inputs[0].value = 0;
  eventBus.emit("changeInput", inputs[0]);
});
