import React, { useEffect,useState } from 'react';
import ReactFc  from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2d from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';


ReactFc.fcRoot(FusionCharts, Column2d, FusionTheme)

function Bargraph1({data}) {

    // Preparing the chart data
    const [chartData, setData] = useState({});

    

    const fetchData = async (state) =>{
        const url = state === 'USA' ? 'https://disease.sh/v3/covid-19/countries/US': `https://api.caw.sh/v3/covid-19/states/${state}`;

        fetch(url)
        .then((response) => response.json())
        .then(data => {
            let dataPoint=[
                {
                    label: 'Projected Cases',
                    value: data?.cases * 10
                },
                {
                    label: 'Confirmed Cases',
                    value: data?.cases
                },
                {
                    label: 'Recovered Cases',
                    value: data?.recovered
                },
                {
                    label: 'Active Cases',
                    value: data?.active
                },
                {
                    label: 'Projected Deaths',
                    value: data?.deaths * 10
                },
                {
                    label: 'Deaths',
                    value: data?.deaths
                }
            ]
            setData(dataPoint)
        })
    }

    useEffect(()=> {
        fetchData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data]);

    
    // Create a JSON object to store the chart configurations
const chartConfigs = {
    type: "column2d", // The chart type
    width: "500", // Width of the chart
    height: "500", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: `COVID-19 Confirmed Cases in ${data}`,
        xAxisName: "Type of Cases",           //Set the x-axis name
        yAxisName: "Number of Cases",
        theme: 'candy'                 //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData
    }
  };
    return (
        <div style={{margin: '10px'}}>
            <ReactFc {...chartConfigs} />
        </div>
    )
}

export default Bargraph1
