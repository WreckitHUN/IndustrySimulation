from flask import Flask, request, render_template, jsonify, make_response
from pymodbus.client import ModbusTcpClient

# Server's IP port is default 502
local = '127.0.0.1'
PLC = '192.168.1.212'

app = Flask(__name__)
client = ModbusTcpClient(host=PLC)


@app.route('/')
def index():
    return ""


@app.route('/input', methods=["POST", "OPTIONS"])
def handle_inputs():
    # CORS
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    # CORS
    data = request.get_json()
    """
    {
    type: I or Q,
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
        return _build_cors_preflight_response()
    # CORS
    response = jsonify(client.read_discrete_inputs(address=0, count=8).bits)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
