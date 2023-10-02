# error_handler.py

from flask import jsonify

def handle_value_error(error):
    """Handle ValueError, usually thrown by algorithm.py"""
    response = jsonify({
        'error': 'Value error occurred.',
        'message': str(error)
    })
    response.status_code = 400  # Bad Request
    return response

def handle_key_error(error):
    """Handle KeyError, such as when the JSON sent by the front end is missing a necessary key"""
    response = jsonify({
        'error': 'Key error occurred.',
        'message': f'Missing key: {str(error)}'
    })
    response.status_code = 400  # Bad Request
    return response

def handle_general_error(error):
    """Handle other common errors"""
    response = jsonify({
        'error': 'A server error occurred.',
        'message': str(error)
    })
    response.status_code = 500  # Internal Server Error
    return response
