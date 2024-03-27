import pandas as pd
from bs4 import BeautifulSoup
from tools import get_chrome


def get_sports():
    df_sports = pd.read_csv(
        "C:/Users/Debbie Hung/Desktop/Python Django Web/practice/File_14349.csv"
    )
    df_sports = df_sports[["運動項目 ", "消耗熱量(大卡/公斤體重/小時)"]]
    for i in range(len(df_sports)):
        if (
            df_sports.loc[i].values[1]
            == df_sports["消耗熱量(大卡/公斤體重/小時)"].min()
        ):
            df_sports.loc[i, "score"] = 1
        elif (
            df_sports.loc[i].values[1]
            < df_sports["消耗熱量(大卡/公斤體重/小時)"].mean()
        ):
            df_sports.loc[i, "score"] = 2
        elif (
            df_sports.loc[i].values[1] < df_sports["消耗熱量(大卡/公斤體重/小時)"].max()
        ):
            df_sports.loc[i, "score"] = 3
        else:
            df_sports.loc[i, "score"] = 4
    columns = df_sports.columns.tolist()
    values = df_sports.values.tolist()
    values.insert(0, columns)

    return columns, values


def get_sixFood():
    url = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=4086"
    chrome = get_chrome(url, hide=True)
    soup = BeautifulSoup(chrome.page_source, "html.parser")
    allText = soup.find("div", class_="htmlBlock").text.split("\n\n\n\n\n\xa0")
    for i in range(len(allText)):
        allText[i] = allText[i].replace(" ", "").replace("\xa0", "")
    kind = []
    for i in range(len(allText)):
        kind.append(allText[i].split("\n")[0])
    desc = []
    for i in range(len(allText)):
        desc.append(allText[i].replace("\n", "").replace(kind[i], ""))

    return kind, desc


if __name__ == "__main__":
    print(get_sixFood())
