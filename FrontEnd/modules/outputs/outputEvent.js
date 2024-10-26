import eventBus from "../eventBus.js";

let pollingTime = 50;

const outputsController = createOutputsController();
// Outputs
// Lamps
const lamp0 = document.querySelector("#Q0");

eventBus.create("readOutputs", readOutputs);

// Read outputs from Modbus device (PLC)
async function readOutputs() {
  try {
    const response = await fetch("http://127.0.0.1:8000/outputs");
    const newOutputs = await response.json(); //[false, false, false, ...]
    // For now I don't use the outputsController since I don't exactly know how to make
    // this code modular, but it will be a future update. For now I hard code my outputs.
    // Q0
    if (newOutputs[0]) {
      lamp0.classList.add("on");
    } else {
      lamp0.classList.remove("on");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
setInterval(() => {
  eventBus.emit("readOutputs");
}, pollingTime);

// TO DO to make this more modular
function createOutputsController() {
  let outputs = Array(8).fill(false);

  const setOutputs = (newOutputs) => {
    outputs = newOutputs;
  };

  const getOutputs = () => outputs;

  const isOn = (address) => outputs[address];

  return {
    setOutputs,
    getOutputs,
    isOn,
  };
}
