// Client address to connect to
let clientAccessPoint = "http://127.0.0.1:8000";
// Enable button to enable/disable signal emit and connection
let enable = false;
const enableButton = document.querySelector("#enable");
// On clicking the enableButton send 0 or 1 to the backend and
// based on the receivedData enable/disable the process
enableButton.addEventListener("click", async () => {
  try {
    const response = await fetch(`${clientAccessPoint}/enable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enable ? 0 : 1),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const receivedData = await response.json();
    enable = receivedData;
  } catch (error) {
    console.error("Error:", error);
  }

  if (enable) {
    enableButton.classList.add("on");
  } else {
    enableButton.classList.remove("on");
  }
});

// Function to create an EventBus
function EventBus(description = "") {
  // Create a comment node to act as the event target
  const eventTarget = document.appendChild(document.createComment(description));

  // Function to add an event listener
  const create = (type, func) => {
    eventTarget.addEventListener(type, func);
  };

  // Function to remove an event listener
  const remove = (type, func) => {
    eventTarget.removeEventListener(type, func);
  };

  // Function to emit an event
  const emit = (type, detail = undefined) => {
    if (!enable) return;
    eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  };

  return {
    clientAccessPoint,
    create,
    remove,
    emit,
  };
}

const eventBus = EventBus("EventBus");

export default eventBus;
