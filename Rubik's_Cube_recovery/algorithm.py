# algorithm.py

import kociemba
def solve(cube_state: str) -> str:
    try:
        solution = kociemba.solve(cube_state)
        return solution
    except Exception as e:
        # Error handling can be performed here, for example, when the Rubik's Cube status is illegal
        raise ValueError(f"Cannot solve the cube. Error: {str(e)}")
