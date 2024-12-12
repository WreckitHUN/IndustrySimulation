# Industry Simulation Project

## Video Demo

https://youtu.be/XHYmCT8Fwh0

## Description

This project is an industry simulation that uses Python Flask for the backend and the `pymodbus` library for ModbusTCP communication. The frontend is built with HTML, CSS, and JavaScript. The simulation allows for sorting operations (based on color and material) that can be controlled with various ModbusTCP-capable devices, such as PLCs and microcontrollers.

![Picture of a sorting station](https://github.com/WreckitHUN/IndustrySimulation/blob/main/AssetsForReadMe/Sorting.png?raw=true)

### Features

- **Backend**: Python Flask server to handle HTTP requests and ModbusTCP communication.
- **Frontend**: Interactive user interface built with HTML, CSS, and JavaScript.
- **ModbusTCP**: Integration with `pymodbus` library to communicate with ModbusTCP devices.
- **Sorting Simulation**: Simulates sorting operations that can be controlled and monitored through the web interface.
- **Device Compatibility**: The simulation itself can be programmed with different ModbusTCP-capable devices like PLCs and microcontrollers.

### Installation and Usage

To get started with the simulation, you only need to set up the backend. Follow these steps to install and configure the necessary components. A PLC demo will also be described.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/WreckitHUN/IndustrySimulation.git
   cd IndustrySimulation
   ```
2. **Create a Virtual environment**:
   ```bash
   cd BackEnd
   python -3 -m venv venv
   ```
3. **Activate the Virtual environment**:
   ```bash
   .\venv\Scripts\activate
   ```
4. **Install requirements for the backend**:
   ```bash
   pip install -r requirements.txt
   ```
5. Install Live Server extension in VS Code. After that in the FrontEnd folder just run the index.html file on the installed live Server.

Once you've completed these steps, you'll be all set to use the simulation. Of course we still need a controlling device such as a PLC or microcontroller. The following section will guide you through setting up the project with a `CODESYS` soft PLC.

### Explanation of the code

### Back End

The flask application provides endpoints to enable or disable the Modbus client, handle input commands, and retrieve output states.

• `Enable/Disable Modbus Client:` The /enable endpoint allows you to enable or disable the Modbus client connection.

• `Handle Inputs:` The /input endpoint processes input commands to write coil values to the PLC. Accepts a JSON payload with address and value to write to the PLC. POST endpoint.

• `Retrieve Outputs:` The /outputs endpoint reads discrete inputs from the PLC and returns their states. GET endpoint.

### Front End

The front end is a bit more complex. The file structure is as follows:

FrontEnd/ <br>
├── assets/<br>
├── modules/<br>
│ ├── canvas/<br>
│ ├── inputs/<br>
│ ├── outputs/<br>
│ ├── eventBus.js/<br>
├── index.html<br>
├── styles.css<br>

In the assets folder there are all the images use for the simulation. Currently only one project's assets are ready.

In the modules folder, the `eventBus.js` file is responsible for handling all the events that occur during the process. I chose this approach because events are handled asynchronously, making it easier to add event listeners to a single object. This method also simplifies scaling the project.

```bash
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
    clientAccessPoint,
    create,
    remove,
    emit,
  };
```

Above is the main part of `eventBus.js` which creates a comment node to act as the event target. It provides methods to add (create), remove (remove), and emit (emit) custom events.

### Handling inputs and outputs

```bash
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
```

The `readOutputs` function is an asynchronous function that fetches the current output states from a Modbus device via a Flask app. It sends a GET request to the `/outputs` endpoint of the backend server and parses the JSON response, which contains an array of boolean values representing the output states or a "disconnected" message. If the response indicates a disconnection, the function returns immediately. Otherwise, it calls the `emitOutputSignals` function with the fetched output states.

```bash
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
```

The `emitOutputSignals` function iterates over the output states and emits events if there are any changes. It loops through each output state in the `futureOutputs` array and compares each output state with the corresponding current state stored in `presentOutputs`. If there is a change, it emits an event (`Q{i}on` or `Q{i}off`) based on whether the output state is `true` or `false`. Finally, it updates the `presentOutputs` with the new output state.

### Utilizing html canvas API

In the canvas folder there are all the controller javascript files which help to visualize the process. I did not use any js framework, I hardcoded the collision values and such.

The `canvas.js` code sets up a canvas-based animation that loads various images and uses different controllers to manage the animation of elements like conveyor, directors, sensors, and workpieces. The animation loop continuously updates the canvas to create a dynamic visual effect.

### CODESYS PLC demo

**Setting up IP address**:

In the `app.py` file, you can configure the IP address for your ModbusTCP-capable device. If you're using a CODESYS Soft PLC, the IP address will be `127.0.0.1`, which is the local IP address.

**Setting up ModbusTCP address**:

> **Since this project uses ModbusTCP, correct addressing is crucial. Please ensure that you set the Modbus addresses accurately to avoid any communication issues**

You can configure the address offset in the `app.py` file by changing the `offset` variable from its default value of 0 to any desired bit count.

**Installing CODESYS**:
After creating a free account at [codesys.com](https://www.codesys.com/) you can download CODESYS Installer, the Add Installation: `CODESYS 3.5 SP20`. You can also add the newest one as well.
