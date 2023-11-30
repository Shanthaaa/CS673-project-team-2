# api.py

from error_handler import handle_value_error, handle_key_error, handle_general_error
from flask import Flask, request, jsonify
from algorithm import solve, generate_random_state, get_random_cube_state
from config import SERVER_HOST, SERVER_PORT, API_VERSION, DEBUG
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# file path
CUBE_STATUS_FILE = os.path.join(os.path.dirname(__file__), 'cube_status.txt')
CUBE_EXERCISE_FILE = os.path.join(os.path.dirname(__file__), 'Saved_exercise_collection.txt')

# Default cube state
DEFAULT_CUBE_STATUS = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"

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

# 1. Read Rubik's Cube Status
@app.route(f'/{API_VERSION}/get_cube_status', methods=['GET'])
def get_cube_status():
    try:
        with open(CUBE_STATUS_FILE, 'r') as f:
            status = f.read().strip()
        return jsonify(cube_status=status)
    except Exception as e:
        return jsonify(error=str(e)), 500

# 2. Modify the status of the Rubik's Cube
@app.route(f'/{API_VERSION}/set_cube_status', methods=['POST'])
def set_cube_status():
    if not request.json or 'cube_status' not in request.json:
        return jsonify(error="Missing cube_status in request"), 400
    new_status = request.json['cube_status']
    if len(new_status) != 54:
        return jsonify(error="Invalid cube_status length"), 400
    try:
        with open(CUBE_STATUS_FILE, 'w') as f:
            f.write(new_status)
        return jsonify(message="Cube status updated successfully")
    except Exception as e:
        return jsonify(error=str(e)), 500

# 3. Reset cube status
@app.route(f'/{API_VERSION}/reset_cube_status', methods=['POST'])
def reset_cube_status():
    try:
        with open(CUBE_STATUS_FILE, 'w') as f:
            f.write(DEFAULT_CUBE_STATUS)
        return jsonify(message="Cube status reset successfully")
    except Exception as e:
        return jsonify(error=str(e)), 500

# New endpoint for generating a random cube state
@app.route(f'/{API_VERSION}/generate_random_cube', methods=['GET'])
def generate_random_cube():
    try:
        random_state = generate_random_state()
        return jsonify(cube_status=random_state)
    except Exception as e:
        return jsonify(error=str(e)), 500

# New route - Get practice cube status
@app.route(f'/{API_VERSION}/get_exercise_cube', methods=['GET'])
def get_exercise_cube():
    try:
        cube_state = get_random_cube_state(CUBE_EXERCISE_FILE)
        return jsonify(cube_state=cube_state)
    except Exception as e:
        return jsonify(error=str(e)), 500

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
