// Enable button to enable/disable signal emit
let enable = false;
const enableButton = document.querySelector("#enable");

enableButton.addEventListener("click", () => {
  enable = !enable;

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
    clientAccessPoint: "http://127.0.0.1:8000",
    create,
    remove,
    emit,
  };
}

const eventBus = EventBus("EventBus");

export default eventBus;
