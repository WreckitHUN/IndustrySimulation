from flask import Flask, request, render_template, jsonify, make_response
from pymodbus.client import ModbusTcpClient

# Server's IP port is default 502
local = '127.0.0.1'
PLC = '192.168.1.212'

enabled = False
bitCount = 1

app = Flask(__name__)
client = ModbusTcpClient(host=local)


@app.route('/')
def index():
    return ""


@app.route('/enable', methods=["POST", "OPTIONS"])
def connect():
    global enabled
    # CORS
    if request.method == "OPTIONS":
        return build_cors_preflight_response()
    # CORS
    data = request.get_json()
    # Connect/Disconnect
    enabled = bool(data)
    if enabled:
        result = client.connect()
        # Return if the connection is successful or not
        response = jsonify(result)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    else:
        client.close()
        response = jsonify(0)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response


@app.route('/input', methods=["POST", "OPTIONS"])
def handle_inputs():
    # CORS
    if request.method == "OPTIONS":
        return build_cors_preflight_response()
    # CORS
    data = request.get_json()
    """
    {
    address: 0 ... 7,
    value: 0 or 1,
    }"""
    print(data)
    address = data["address"]
    value = data["value"]
    # Write coil
    client.write_coil(address=address, value=value)
    # CORS
    response = jsonify(["OK"])
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/outputs', methods=["GET", "OPTIONS"])
def handle_outputs():
    # CORS
    if request.method == "OPTIONS":
        return build_cors_preflight_response()
    # CORS
    # Check if the connection is still a on
    modbusResponse = client.read_discrete_inputs(address=0, count=bitCount * 8)
    if hasattr(modbusResponse, "bits"):
        response = jsonify(modbusResponse.bits)
    else:
        response = jsonify("disconnected")
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
