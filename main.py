from flask import Flask, render_template, request
from info import get_sixFood
import json


app = Flask(__name__)


@app.route("/health", methods=["GET", "POST"])
def health():
    bmi = None
    message = ""
    if request.method == "POST":
        try:
            height = eval(request.form.get("height"))
            weight = eval(request.form.get("weight"))
            bmi = get_bmi(height, weight)
            if bmi < 18.5:
                message = "體重過輕"
            elif bmi < 24:
                message = "健康!"
            elif bmi < 27:
                message = "過重"
            elif bmi < 30:
                message = "輕度肥胖"
            elif bmi < 35:
                message = "中度肥胖"
            else:
                message = "重度肥胖"
        except:
            bmi = "輸入有誤"
    if request.form.get("clear"):
        bmi = ""
    return render_template("health.html", bmi=bmi, message=message)


def get_bmi(height, weight):
    return round(weight / (height / 100) ** 2, 2)


@app.route("/sixFood")
def sixFood_data():
    kind, desc = get_sixFood()
    dict = {}
    dictall = {}
    data = []
    for i in range(len(kind)):
        for j in range(len(kind)):
            if j == 5:
                dict["value"] = 0.167
                dict["name"] = kind[5]
                dictall["chart"] = dict
                dictall["info"] = desc[5]
            else:
                dict["value"] = 0.167
                dict["name"] = kind[i - 1]
                dictall["chart"] = dict
                dictall["info"] = desc[i - 1]
                dict = {}
                dictall = {}

        data.append(dictall)
    chart = [data[i]["chart"] for i in range(len(data))]
    info = [data[i]["info"].split("，") for i in range(len(data))]

    result = json.dumps(
        {
            "chart": chart,
            "info": info,
        },
        ensure_ascii=False,
    )

    return result


@app.route("/sixFoodText")
def get_sixFoodText():
    kind, desc = get_sixFood()
    result = json.dumps(desc, ensure_ascii=False)
    return result


@app.route("/")
def index():
    return "Hello Flask"


app.run(debug=True)
