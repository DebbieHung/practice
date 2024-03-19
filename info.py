import pandas as pd
from bs4 import BeautifulSoup
from tools import get_chrome


def get_sports():
    df_sports = pd.read_csv(
        "C:/Users/Debbie Hung/Desktop/Python Django Web/practice/File_14349.csv"
    )
    return df_sports


def get_sixFood():
    url = "https://www.hpa.gov.tw/Pages/List.aspx?nodeid=4086"
    chrome = get_chrome(url)
    soup = BeautifulSoup(chrome.page_source, "lxml")
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
