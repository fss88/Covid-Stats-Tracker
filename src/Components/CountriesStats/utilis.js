import numeral from 'numeral';
import React from 'react';
// import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 160,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 120,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(128,0,128)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 200,
    },
  };


export const formatStats = (stat) => stat ? `+${numeral(stat).format("0,0a")}` : "+0";


export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b) => {
        if(a.cases > b.cases) {
            return -1;
        }else {
            return 1;
        }
    });
    return sortedData;
}


export const showDataOnMap = (data, casesType='cases') => 
    data.map(country => (
        <Circle
            center = {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
                color: casesTypeColors[casesType].rgb,
                fillColor: casesTypeColors[casesType].rgb,
            }}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="popup-wrapper">
                    <div
                        className="popup-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})`}}
                    />
                    <div className="popup-name">{country.country}</div>
                    <div className="popup-confirmed">Cases: {numeral(country.cases).format("0,0")}</div>
                    <div className="popup-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    <div className="popup-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ));