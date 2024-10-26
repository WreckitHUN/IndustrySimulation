import eventBus from "../eventBus.js";
import createInput from "./inputEvent.js";

const I0 = createInput(0, 0);

document.querySelector("#I0").addEventListener("mousedown", () => {
  I0.value = 1;
  eventBus.emit("changeInput", I0);
});

document.querySelector("#I0").addEventListener("mouseup", () => {
  I0.value = 0;
  eventBus.emit("changeInput", I0);
});
