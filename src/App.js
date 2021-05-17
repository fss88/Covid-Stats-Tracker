import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import LineGraph from './LineGraph';
import './App.css';
import "leaflet/dist/leaflet.css"
import { formatStats } from './utilis';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({lat: 35, lng: -42.658})
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
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
          setMapCountries(data);
        });
    };

    getAllCountriesData();
  }, []);

  const onCountryChange = (e) => {
    const countryCode = e.target.value;

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
    .then(response => response.json())
    .then((res) => {
      setCountry(countryCode);
      setCountryInfo(res);

      
      const newCenter = {...mapCenter};
      newCenter['lat'] = res.countryInfo.lat;
      newCenter['lng'] = res.countryInfo.long;
      setMapCenter(newCenter);
      setMapZoom(5);
    })
  }
  console.log(countryInfo);
  
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

        {/* map */}

        <Map
        casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>
      <div className="app_right">
        <div className="app__right__top">
          <h3 >Worldwide new Cases</h3>
          <LineGraph />
        </div>
      
        <div  >
          <div>
      
            <div className="app__stats">
              <InfoBox
              onClick={e => setCasesType('cases')}
                title="Cases"
                cases={formatStats(countryInfo.todayCases)}
                total={formatStats(countryInfo.cases)} />

              <InfoBox
              onClick={e => setCasesType('recovered')}
                title="Recoveries"
                cases={formatStats(countryInfo.todayRecovered)}
                total={formatStats(countryInfo.recovered)}
              />

              <InfoBox
              onClick={e => setCasesType('deaths')}
                title="Deaths"
                cases={formatStats(countryInfo.todayDeaths)}
                total={formatStats(countryInfo.deaths)}
              />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
