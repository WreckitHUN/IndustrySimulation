# Industry Simulation Project

## Video Demo

[Insert URL Here]

## Description

This project is an industry simulation that uses Python Flask for the backend and the `pymodbus` library for ModbusTCP communication. The frontend is built with HTML, CSS, and JavaScript. The simulation allows for sorting operations (based on color and material) that can be controlled with various ModbusTCP-capable devices, such as PLCs and microcontrollers.

### Features

- **Backend**: Python Flask server to handle HTTP requests and ModbusTCP communication.
- **Frontend**: Interactive user interface built with HTML, CSS, and JavaScript.
- **ModbusTCP**: Integration with `pymodbus` library to communicate with ModbusTCP devices.
- **Sorting Simulation**: Simulates sorting operations that can be controlled and monitored through the web interface.
- **Device Compatibility**: The simulation itself can be programmed with different ModbusTCP-capable devices like PLCs and microcontrollers.

### Installation

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

Once you've completed these steps, you'll be all set to use the simulation. The following section will guide you through setting up the project with a `CODESYS` soft PLC.

### CODESYS PLC demo

**Setting up IP address**:

In the `app.py` file, you can configure the IP address for your ModbusTCP-capable device. If you're using a CODESYS Soft PLC, the IP address will be `127.0.0.1`, which is the local IP address.

**Setting up ModbusTCP address**:

> **Since this project uses ModbusTCP, correct addressing is crucial. Please ensure that you set the Modbus addresses accurately to avoid any communication issues**

You can configure the address offset in the `app.py` file by changing the `offset` variable from its default value of 0 to any desired bit count.
