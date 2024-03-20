const chart1 = echarts.init(document.getElementById('sixFood'));

draw_sixFood()

function draw_sixFood() {
    $.ajax(
        {
            url: "/sixFood",
            type: "GET",
            dataType: "json",
            success: (result) => {
                drawchart(chart1, "六大類食物", result)
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
}

