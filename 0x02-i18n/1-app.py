#!/usr/bin/env python3
""" Basic flask app """
from flask import Flask, render_template
from flask_babel import Babel


class Config:
    """ Config class for app"""
    LANGUAGES = ["en", "fr"]


app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)


babel = Babel(app, default_locale="en", default_timezone="UTC")


@app.route('/')
def index_page() -> str:
    """ index page """
    return render_template('1-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
