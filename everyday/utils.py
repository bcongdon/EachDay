from flask import make_response, jsonify


def send_error(message, code=400, **kwargs):
    payload = {
        'status': 'error',
        'message': message
    }
    payload.update(kwargs)
    return make_response(jsonify(payload), code)


def send_success(message, code=200, **kwargs):
    payload = {
        'status': 'success',
        'message': message
    }
    payload.update(kwargs)
    return make_response(jsonify(payload), code)
