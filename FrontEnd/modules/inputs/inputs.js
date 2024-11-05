import eventBus from "../eventBus.js";
import createInput from "./inputEvent.js";

const I0 = createInput(0, 0);
const I1 = createInput(1, 0);
const I2 = createInput(2, 0);
const I3 = createInput(3, 0);
const I4 = createInput(4, 0);
const I5 = createInput(5, 0);
const I6 = createInput(6, 0);
const I7 = createInput(7, 0);

document.querySelector("#I0").addEventListener("mousedown", () => {
  I0.value = 1;
  eventBus.emit("changeInput", I0);
});

document.querySelector("#I0").addEventListener("mouseup", () => {
  I0.value = 0;
  eventBus.emit("changeInput", I0);
});
