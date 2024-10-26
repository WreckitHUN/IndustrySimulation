import eventBus from "../eventBus.js";

export default function createInput(address, value = 0) {
  return {
    address,
    value,
  };
}

eventBus.create("changeInput", changeInput);

async function changeInput(event) {
  // event.detail is an object {address: 0, value: 0 or 1}
  const input = event.detail;
  try {
    const response = await fetch("http://127.0.0.1:8000/input", {
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
    console.log(receivedData);
  } catch (error) {
    console.error("Error:", error);
  }
}
