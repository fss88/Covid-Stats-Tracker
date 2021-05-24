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



function LineGraph2({data}) {

    let stateName = data;
    const [graphData, setData] = useState({});

    const buildChartData = (data, casesType='cases') => {
        console.log();
        const chartData = [];
        let lastDataPoint;
        if(stateName === 'USA'){
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
        }else {
            
            for(let date of data){
                if(lastDataPoint) {
                  let dateArr = date.date.split('-');

                  const newDataPoint = {
                      x: `${parseInt(dateArr[1])}/${parseInt(dateArr[2])}/${dateArr[0].substring(2)}`,
                      y: date.cases - lastDataPoint
                  }
                  chartData.push(newDataPoint);
                }
                lastDataPoint = date.cases;
            }
        }
        
        return chartData;
    }


    const fetchData = async (state) => {
        const url = state === 'USA'? 'https://api.caw.sh/v3/covid-19/historical/USA?lastdays=30' : `https://api.caw.sh/v3/covid-19/nyt/states/${data}?lastdays=30`

        await  fetch(url)
            .then(response => response.json())
            .then(data => {
                if(state==='USA'){
                    let chartData = buildChartData(data.timeline, 'cases');
                    setData(chartData);
                }else {
                    let chartData = buildChartData(data, 'cases');
                    setData(chartData);
                }
                
        });
    }

    useEffect(() => {
       fetchData(stateName);
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[stateName]);

    

    

    return (
        <div style={{margin: '10px'}}>
            <div style={{height: '60vh', width: '100%', color: 'white', background: 'white',
                marginBottom: '10px'}}>
                    {graphData?.length > 0 && (
                        <Line
                            data = {{
                                datasets: [
                                    {
                                        label: `${stateName} daily cases last 30 days`,
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
        </div>
        
    )
}

export default LineGraph2;
