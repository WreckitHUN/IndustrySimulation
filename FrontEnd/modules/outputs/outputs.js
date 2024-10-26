import eventBus from "../eventBus.js";

eventBus.create("Q0on", () => {
  document.querySelector("#Q0").classList.add("on");
});
eventBus.create("Q0off", () => {
  document.querySelector("#Q0").classList.remove("on");
});
eventBus.create("Q1on", () => {
  document.querySelector("#Q1").classList.add("on");
});
eventBus.create("Q1off", () => {
  document.querySelector("#Q1").classList.remove("on");
});
eventBus.create("Q2on", () => {
  document.querySelector("#Q2").classList.add("on");
});
eventBus.create("Q2off", () => {
  document.querySelector("#Q2").classList.remove("on");
});
