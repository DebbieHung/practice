const chart1 = echarts.init(document.getElementById('sixFood'));
const chart2 = echarts.init(document.getElementById('sixFoodtext'));
const chart3 = echarts.init(document.getElementById('sports'));

draw_sixFood()
drawSports()

function drawSports() {
    chart3.showLoading();
    $.ajax(
        {
            url: "/sports",
            type: "GET",
            dataType: "json",
            success: (result) => {
                console.log(result['val'], result["col"][1], result["col"][0]);
                drawchart_bar(chart3, result['val'], result["col"][1], result["col"][0])
                chart3.hideLoading();
            }

        }
    )

}

function draw_sixFood() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/sixFood",
            type: "GET",
            dataType: "json",
            success: (result) => {
                drawchart(chart1, "六大類食物", result['chart'], result['info'])
                chart1.hideLoading();
            }
        }
    )
}

function drawchart(chart, name, data, text) {
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: name,
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                padAngle: 5,
                itemStyle: {
                    borderRadius: 10
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };

    option && chart.setOption(option);
    chart.on('click', function (params) {
        for (i = 0; i < 6; i++) {
            if (params.name == data[i]['name']) {
                showText(text[i], chart2)
                console.log(text[i]);
            }
        }

    })
}

function showText(text, chart) {
    let option = {
        series: [
            {
                type: 'scatter',
                symbolSize: 1,
                data: [
                    {
                        value: [0, 0],
                        label: {
                            distance: 5,
                            show: true,
                            formatter: text.join('\n'),
                            backgroundColor: "#deb887",
                            borderColor: '#d2691e',
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 5,
                            color: '#000',
                            fontSize: 16,
                            shadowBlur: 3,
                            shadowColor: '#888',
                            shadowOffsetX: 0,
                            shadowOffsetY: 3,
                            lineHeight: 30,
                            rich: {
                                fontSize: 16,
                                textBorderColor: '#000',
                                textBorderWidth: 3,
                                color: '#fff',
                            }
                        }
                    }
                ]
            }
        ],
        xAxis: {
            show: false,
            min: -1,
            max: 1
        },
        yAxis: {
            show: false,
            min: -1,
            max: 1
        }
    };
    chart.setOption(option);
}

function drawchart_bar(chart, data, xName, yName) {
    let option = {
        dataset: {
            source: data
        },
        grid: { containLabel: true },
        xAxis: { name: 'amount' },
        yAxis: { type: 'category' },
        visualMap: {
            orient: 'horizontal',
            left: 'center',
            min: 0,
            max: 20,
            text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
                color: ['#87cefa', '#FFCE34', '#65B581']
            }
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: xName,
                    // Map the "product" column to Y axis
                    y: yName
                }
            }
        ]
    };
    chart.setOption(option);

}
