# algorithm.py

import kociemba
import random

def solve(cube_state: str) -> str:
    try:
        solution = kociemba.solve(cube_state)
        return solution
    except Exception as e:
        raise ValueError(f"Cannot solve the cube. Error: {str(e)}")

def generate_random_state(num_moves=25):
    moves = ["U", "D", "L", "R", "F", "B", 
             "U'", "D'", "L'", "R'", "F'", "B'", 
             "U2", "D2", "L2", "R2", "F2", "B2"]
    scramble = " ".join(random.choices(moves, k=num_moves))
    return scramble

def get_random_cube_state(file_path: str) -> str:
    with open(file_path, 'r') as file:
        lines = file.readlines()
    return random.choice(lines).strip()
