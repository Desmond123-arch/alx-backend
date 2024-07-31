#!/usr/bin/env python3
""" Basic flask app """
from flask import Flask, render_template, request
from flask_babel import Babel


class Config:
    """ Config class for app"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.url_map.strict_slashes = False
app.config.from_object(Config)
babel = Babel(app, default_locale="en", default_timezone="UTC")


@babel.localeselector
def get_locale():
    """Get langauge code of user"""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@app.route('/')
def index_page() -> str:
    """ index page """

    return render_template('2-index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
