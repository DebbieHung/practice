from flask import Flask, render_template

app = Flask(__name__)


@app.route("/health")
def health():
    return render_template("health.html")


@app.route("/")
def index():
    return "Hello Flask"


app.run(debug=True)
