from flask import Flask, render_template, request


app = Flask(__name__)


@app.route("/health", methods=["GET", "POST"])
def health():
    bmi = None
    if request.method == "POST":
        try:
            height = eval(request.form.get("height"))
            weight = eval(request.form.get("weight"))
            bmi = get_bmi(height, weight)
        except:
            bmi = "輸入有誤"
    return render_template("health.html", bmi=bmi)


def get_bmi(height, weight):
    return round(weight / (height / 100) ** 2, 2)


@app.route("/")
def index():
    return "Hello Flask"


app.run(debug=True)
