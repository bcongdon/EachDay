from werkzeug.local import LocalProxy
from flask import current_app

log = LocalProxy(lambda: current_app.logger)
