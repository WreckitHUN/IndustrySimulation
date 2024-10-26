import eventBus from "../eventBus.js";

eventBus.create("Q0on", () => {
  document.querySelector("#Q0").classList.add("on");
});
eventBus.create("Q0off", () => {
  document.querySelector("#Q0").classList.remove("on");
});
