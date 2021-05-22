import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { numeral } from 'numeral';


const options = {

    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };



function LineGraph({casesType = 'cases'}) {

    const [graphData, setData] = useState({});

    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;
        for(let date in data.cases){
            if(lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    useEffect(() => {

        const fetchData = async () => {
            await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                .then(response => response.json())
                .then(data => {
                    let chartData = buildChartData(data, 'cases');
                    setData(chartData)
            });
        }

        fetchData();
        
    },[casesType]);

    

    return (
        <div style={{height: '30vh', width: '100%', color: 'white', background: 'white',
        marginBottom: '10px'}}>
            {graphData?.length > 0 && (
                <Line
                    data = {{
                        datasets: [
                            {
                                label: "Worldwide daily cases",
                                fill: true,
                                borderColor: "#CC1034",
                                backgroundColor: "rgba(204, 16, 52, 0.7)",
                                data: graphData
                            },
                        ],
                    }}
                    options={options}
                />
            )}
            
            
        </div>
    )
}

export default LineGraph;
