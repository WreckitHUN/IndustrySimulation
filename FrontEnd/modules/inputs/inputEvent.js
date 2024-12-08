import eventBus from "../eventBus.js";

let enabled = false;

// Create the 7 inputs from 0 to 6
export const inputs = [];
[...Array(7)].forEach((e, i) => {
  let input = createInput(i, 0);
  inputs.push(input);
});

// Enable button is resetting the inputs
eventBus.create("enabled", () => {
  enabled = true;
  inputs.forEach((input) => {
    input.value = 0;
    eventBus.emit("changeInput", input);
  });
});
// Disable button is resetting the inputs
eventBus.create("disabled", () => {
  inputs.forEach((input) => {
    input.value = 0;
    eventBus.emit("changeInput", input);
  });
  enabled = false;
});

export default function createInput(address, value = 0) {
  return {
    address,
    value,
  };
}

eventBus.create("changeInput", changeInput);

async function changeInput(event) {
  if (!enabled) return;
  // event.detail is an object {address: 0, value: 0 or 1}
  const input = event.detail;
  try {
    const response = await fetch(`${eventBus.clientAccessPoint}/input`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const receivedData = await response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}
