import eventBus from "./eventBus.js";

let inputs = [0, 0, 0, 0, 0, 0, 0, 0];

eventBus.create("changeInputs", async (event) => {
  // event.detail is an array like [0,0,0,0,0,0,0,0] each element is 0 or 1
  const inputs = event.detail;
  try {
    if (inputs.length !== 8) {
      throw new Error("inputs array is invalid");
    }
    const response = await fetch("http://127.0.0.1:8000/inputs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const receivedData = await response.json();
    console.log(receivedData);
  } catch (error) {
    console.error("Error:", error);
  }
});

const I0 = document.querySelector("#I0");

I0.addEventListener("mousedown", () => {
  inputs[0] = 1;
  eventBus.emit("changeInputs", inputs);
});

I0.addEventListener("mouseup", () => {
  inputs[0] = 0;
  eventBus.emit("changeInputs", inputs);
});
