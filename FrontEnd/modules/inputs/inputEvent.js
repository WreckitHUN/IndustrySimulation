import eventBus from "../eventBus.js";

export default function createInput(type, address, value = 0) {
  return {
    type,
    address,
    value,
  };
}

eventBus.create("changeInput", changeInput);

async function changeInput(event) {
  // event.detail is an object {type: I or Q, address: 0, value: 0 or 1}
  const input = event.detail;
  try {
    if (input.type !== "I") {
      throw new Error("it is not an input");
    }

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
