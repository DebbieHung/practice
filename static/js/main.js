const chart1 = echarts.init(document.getElementById('sixFood'));
const chart2 = echarts.init(document.getElementById('sixFoodtext'));


draw_sixFood()

function draw_sixFood() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/sixFood",
            type: "GET",
            dataType: "json",
            success: (result) => {
                drawchart(chart1, "六大類食物", result)
                chart1.hideLoading();
            }
        }
    )
}

function drawchart(chart, name, data) {
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
    chart.on('click', function () {
        showText("test", chart2)
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
                            show: true,
                            formatter: [
                                text
                            ].join('\n'),
                            backgroundColor: '#eee',
                            borderColor: '#333',
                            borderWidth: 2,
                            borderRadius: 5,
                            padding: 10,
                            color: '#000',
                            fontSize: 14,
                            shadowBlur: 3,
                            shadowColor: '#888',
                            shadowOffsetX: 0,
                            shadowOffsetY: 3,
                            lineHeight: 30,
                            rich: {
                                fontSize: 20,
                                textBorderColor: '#000',
                                textBorderWidth: 3,
                                color: '#fff'
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

