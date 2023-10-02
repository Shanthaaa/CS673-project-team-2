# api.py

from error_handler import handle_value_error, handle_key_error, handle_general_error
from flask import Flask, request, jsonify
from algorithm import solve
from config import SERVER_HOST, SERVER_PORT, API_VERSION, DEBUG  

app = Flask(__name__)

@app.route(f'/{API_VERSION}/solve', methods=['POST'])
def solve_cube():
    if not request.json:
        return jsonify(error="Request must be in JSON format"), 400

    cube_state = request.json.get('cube_state')
    if not cube_state:
        return jsonify(error="Missing cube_state"), 400

    try:
        solution = solve(cube_state)
        return jsonify(solution=solution)
    except ValueError as e:
        return jsonify(error=str(e)), 400

@app.errorhandler(ValueError)
def value_error_handler(error):
    return handle_value_error(error)

@app.errorhandler(KeyError)
def key_error_handler(error):
    return handle_key_error(error)

@app.errorhandler(Exception)
def general_error_handler(error):
    return handle_general_error(error)

if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=DEBUG)
