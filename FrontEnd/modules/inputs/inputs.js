import eventBus from "../eventBus.js";
import createInput from "./inputEvent.js";

const I0 = createInput(0, 0);
const I1 = createInput(1, 0);
const I2 = createInput(2, 0);

document.querySelector("#I0").addEventListener("mousedown", () => {
  I0.value = 1;
  eventBus.emit("changeInput", I0);
});

document.querySelector("#I0").addEventListener("mouseup", () => {
  I0.value = 0;
  eventBus.emit("changeInput", I0);
});

document.querySelector("#I1").addEventListener("mousedown", () => {
  I1.value = 1;
  eventBus.emit("changeInput", I1);
});

document.querySelector("#I1").addEventListener("mouseup", () => {
  I1.value = 0;
  eventBus.emit("changeInput", I1);
});

document.querySelector("#I2").addEventListener("mousedown", () => {
  I2.value = 1;
  eventBus.emit("changeInput", I2);
});

document.querySelector("#I2").addEventListener("mouseup", () => {
  I2.value = 0;
  eventBus.emit("changeInput", I2);
});
