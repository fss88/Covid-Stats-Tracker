import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
// import Table from './Table';
import LineGraph from './LineGraph';
// import { sortData } from './utilis';
import './App.css';
import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  // const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.687, lng: -42.36547})
  const [mapZoom, setMapZoom] = useState(3);


  useEffect(() =>{
    fetch('https://disease.sh/v3/covid-19/all').then(response => response.json()).then(data => {
      setCountryInfo(data);
    } )
  }, []);

  // https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    // Send an async request to get all countries' data, wait for the response and use that response

    const getAllCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          // const sortedData = sortData(data);
          // setTableData(sortedData);
          setCountries(countries);
        });
    };

    getAllCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url).then(response => response.json()).then(res => {
      setCountry(countryCode);
      setCountryInfo(res);
      console.log(res);

      setMapCenter([res.countryInfo.lat, res.countryInfo.long]);
      setMapZoom(4);
      console.log(mapCenter);
    });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>CovTrack2021</h1>
          <FormControl>
            <Select className="app__search" variant="outlined"
              onChange={onCountryChange}
              value={country}>

              {/* loop through all countries in our country variable and render each value */}

              <MenuItem value={country}>Worldwide</MenuItem>
              {countries.map(function (country, index) {
                return <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
              })}

            </Select>
          </FormControl>
        </div>

        {/* <div className="app__stats">

          <InfoBox 
          title="Coronavirus Cases" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases} />
          <InfoBox 
          title="Recoveries" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered}
          />
          <InfoBox 
          title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths}
          />

        </div> */}



        {/* map */}

        <Map 
        center={mapCenter}
        zoom={mapZoom}
        />

      </div>
      <Card className="app_right">
        <CardContent>
          {/* <h3>Live cases by country</h3>
              <Table countries={tableData}/> */}
          <h3>Worldwide new Cases</h3>
          <LineGraph />
          <div className="app__stats">
          <InfoBox 
          title="Coronavirus Cases" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases} />

          <InfoBox 
          title="Recoveries" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered}
          />

          <InfoBox 
          title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths}
          />
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
