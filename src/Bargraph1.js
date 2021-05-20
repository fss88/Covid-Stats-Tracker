import React, { useEffect, useState } from 'react';
import ReactFc  from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2d from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';


ReactFc.fcRoot(FusionCharts, Column2d, FusionTheme)

function Bargraph1() {

    // Preparing the chart data
    const [chartData, setData] = useState({});

    useEffect(()=> {
        const fetchData = async () =>{
            fetch('https://api.caw.sh/v3/covid-19/continents')
                .then(response => response.json())
                .then(data =>{
                    let point = [];
                    for(let dataa of data){
                    let  datapoint={
                            label: dataa.continent,
                            value: dataa.cases
                        }
                        point.push(datapoint);
                    }
                    setData(point);
                });
            }

            fetchData();
    })

    
    // Create a JSON object to store the chart configurations
const chartConfigs = {
    type: "column2d", // The chart type
    width: "300", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Covid 19 confirmed cases in continents (millions)",
        xAxisName: "Continent",           //Set the x-axis name
        yAxisName: "TotalCovid cases ",
        theme: "candy"                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    }
  };
    return (
        <div>
            <ReactFc {...chartConfigs} />
        </div>
    )
}

export default Bargraph1
