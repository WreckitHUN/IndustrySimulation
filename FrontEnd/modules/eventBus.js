/* HTML comments are notes for developers and don’t affect the
 page’s functionality. However, they are still part of the DOM as 
 nodes with a Comment interface, inheriting from Node. */

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
    eventTarget.dispatchEvent(new CustomEvent(type, { detail }));
  };

  return {
    create,
    remove,
    emit,
  };
}

const eventBus = EventBus("EventBus");

export default eventBus;
