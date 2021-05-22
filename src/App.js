import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import RegionalInfoBox from './RegionalInfoBox';
import Map from './Map';
import LineGraph from './LineGraph';
import LineGraph2 from './LineGraph2';
import './App.css';
import "leaflet/dist/leaflet.css"
import { formatStats } from './utilis';
import Map2 from './Map2';
import Bargraph1 from './Bargraph1';
import Table from './Table';
import TableStates from './TableStates';



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [stateInfo, setStateInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 35, lng: -42.658 })
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  // this variables stores state statistics
  // const [stateStats, setStateStats] = useState([]);
  //this variable stores all states by name
  const [states, setStateData] = useState([]);
  const [state, setSelectedState] = useState('USA');
  const [casesType, setCasesType] = useState('cases');
  const [allStates, setAllStates] = useState([]);


  
  useEffect(() => {
    // get worldwide data
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      },[])
    // get all US states
    fetch('https://api.caw.sh/v3/covid-19/historical/usacounties')
    .then(response => response.json())
    .then(data => {
      setStateData(data);
    });
    // get USA data
    fetch('https://disease.sh/v3/covid-19/countries/US')
    .then(response => response.json())
    .then(data => {
      setStateInfo(data);
    })

    // get all states data
    fetch('https://api.caw.sh/v3/covid-19/states')
    .then((response) => response.json())
    .then((data)=> {
      setAllStates(data);
    });

  }, []);

 

  useEffect(() => {
    // Send an async request to get all countries' data, wait for the response and use that response

    const getAllCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries').then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getAllCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
      });
  };


  const onStateChange =(e) => {
    const stateName = e.target.value;

    const url = stateName === 'USA' ? 'https://disease.sh/v3/covid-19/countries/US' : `https://api.caw.sh/v3/covid-19/states/${stateName}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setStateInfo(data)
    }) 
    setSelectedState(stateName);
  }


  return (
    <div className="app">
      <div className="hero">
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
      <h1 style={{textAlign: 'center'}}>Covid in the US</h1>
      <div className="region_select" style={{textAlign: 'center', margin: '10px'}}>
       <FormControl>
              <Select className="app__search" variant="outlined"
                onChange={onStateChange}
                value={state}>

                {/* loop through all countries in our country variable and render each value */}

                <MenuItem value='USA'>{state}</MenuItem>
                {states.map(function (state, index) {
                  return <MenuItem key={index} value={state}>{state}</MenuItem>
                })}

              </Select>
            </FormControl>
       </div>
      <div className="app__region">
       
        <div className="app__left">
          <h3 >{state} Cases</h3>
          
          <div className="regional_boxes">
            <RegionalInfoBox
              onClick={e => setCasesType('Cases')}
              title="Cases"
              cases={formatStats(stateInfo.todayCases)}
              total={formatStats(stateInfo.cases)}
            />
            <RegionalInfoBox
              title="Recoveries"
              cases={formatStats(stateInfo.todayRecovered)}
              total={formatStats(stateInfo.recovered)}
            />
            <RegionalInfoBox
              title="Death"
              cases={formatStats(stateInfo.todayDeaths)}
              total={formatStats(stateInfo.deaths)}
            />
            <RegionalInfoBox
              title="Active"
              // cases={formatStats(stateInfo.active)}
              total={formatStats(stateInfo.active)}
            />
          </div>
          <Map2

            state={stateInfo}
            casesType={casesType}
          />
        
        </div>
        <div className="region_right">
        
          <LineGraph2 
            data={state}
          />
          <Bargraph1 
            data={state}
          />
          
        </div>
        
       
      </div>
      <div className="app__tables">
        <div className="table_left">
          <h3>Covid 19 in different countries</h3>
          <Table
            countries={mapCountries}
          />
        </div>
        <div className="table_right">
          <h3>Covid 19 in different states</h3>
          <TableStates
            states={allStates}
          />
        </div>
      </div>
      <footer style={{textAlign: 'center'}}>
        Data coutesy of Disease.sh Api
        The frequency of data updates is dependent on the end point. For more details checkout their documentation <a href={'https://disease.sh/'}>here</a>
      </footer>
    </div>

  );
}

export default App;
