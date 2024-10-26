import eventBus from "../eventBus.js";
let pollingTime = 50;
const presentOutputs = createOutputsController();
eventBus.create("readOutputs", readOutputs);
// Polling for outputs at the specified interval
setInterval(() => {
  eventBus.emit("readOutputs");
}, pollingTime);

// Read outputs from Modbus device (PLC)
async function readOutputs() {
  try {
    const response = await fetch("http://127.0.0.1:8000/outputs");
    const futureOutputs = await response.json(); // [true, false, false, ...]
    emitOutputSignals(futureOutputs);
  } catch (error) {
    console.error("Error:", error);
  }
}

function emitOutputSignals(futureOutputs) {
  // Iterate over the outputs and emit the correct signal if there was a change
  futureOutputs.forEach((value, i) => {
    // Check if the value has changed
    if (value === presentOutputs.getOutput(i)) return; // No change, so just continue
    // Emit the appropriate event based on the value
    if (value) {
      eventBus.emit(`Q${i}on`); // Emit "on" event if the value is true
    } else {
      eventBus.emit(`Q${i}off`); // Emit "off" event if the value is false
    }
    // Update the presentOutputs with the new value
    presentOutputs.setOutput(value, i);
  });
}

// TO DO to make this more modular
function createOutputsController() {
  let outputs = Array(8).fill(false);

  const setOutput = (newOutput, index) => {
    outputs[index] = newOutput;
  };

  const getOutput = (index) => outputs[index];

  return {
    setOutput,
    getOutput,
  };
}
