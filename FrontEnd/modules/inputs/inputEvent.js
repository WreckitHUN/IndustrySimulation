import eventBus from "../eventBus.js";

let enabled = false;

eventBus.create("enabled", () => {
  enabled = true;
});

eventBus.create("disabled", () => {
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
