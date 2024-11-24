import eventBus from "../eventBus.js";

let interval0;
let pollingTime = 50;
const presentOutputs = createOutputs();

eventBus.create("readOutputs", readOutputs);
// Polling for outputs at the specified interval if enabled
eventBus.create("enabled", () => {
  interval0 = setInterval(() => {
    eventBus.emit("readOutputs");
  }, pollingTime);
});

// Clear the polling when disabled
eventBus.create("disabled", () => {
  clearInterval(interval0);
});

// Read outputs from Modbus device (PLC) via FLASK app
async function readOutputs() {
  try {
    const response = await fetch(`${eventBus.clientAccessPoint}/outputs`);
    const futureOutputs = await response.json(); // [true, false, false, ...] or disconnected
    if (futureOutputs === "disconnected") {
      return;
    }
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
    /* FOR NOW IT WILL EMIT OUTPUT SIGNALS EVEN WHEN THEY ARE NOT CREATED TO DO... */
    if (value) {
      eventBus.emit(`Q${i}on`); // Emit "on" event if the value is true
    } else {
      eventBus.emit(`Q${i}off`); // Emit "off" event if the value is false
    }
    // Update the presentOutputs with the new value
    presentOutputs.setOutput(value, i);
  });
}

function createOutputs() {
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
