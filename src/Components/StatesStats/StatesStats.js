import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import './StatesStats.css';
import { formatStats } from './utilis';
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    
  }));

function StatesStats() {

  const classes = useStyles();
  const [states, setStates] = useState([]);
  const [state, setState] = useState('CA');
  const [stateInfo, setStateInfo] = useState({});

useEffect(() => {
  //send request to get CA data
  const initialFetch = async () => {
    fetch('https://api.covidactnow.org/v2/state/CA.json?apiKey=fa4e0a37946e4caa8692c487250889cb')
      .then(response => response.json())
      .then(data => {
        setStateInfo(data);
      })
  };
  initialFetch();
  }, []);

useEffect(() => {
  // Send an async request to get all states' data, wait for the response and use that response

  const getAllStatesData = async () => {
    await fetch('https://api.covidactnow.org/v2/states.json?apiKey=fa4e0a37946e4caa8692c487250889cb')
    .then((response) => response.json())
    .then((data) => {
        const statesData = data.map((state) => ({
          name: state.state,
          value: state.state,
        }));

        setStates(statesData);
      });
  };

  getAllStatesData();
}, []);


const onStateChange = async (e) => {
    const stateCode = e.target.value;

    const url = `https://api.covidactnow.org/v2/state/${stateCode}.json?apiKey=fa4e0a37946e4caa8692c487250889cb`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setState(stateCode);
          setStateInfo(data);
     
      });
};

console.log(stateInfo);

  return (
    <>
    <div className="app">
          <div className="app__header">
            <h1>CovTrack2021</h1>
            <FormControl>
              <Select className="app__search" variant="outlined"
                onChange={onStateChange}
                value={state}>

                {/* loop through all countries in our country variable and render each value */}

                <MenuItem value={state}></MenuItem>
                {states.map(function (state, index) {
                  return <MenuItem key={index} value={state.value}>{state.name}</MenuItem>
                })}

              </Select>
            </FormControl>

          </div>
         
    </div>
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item lg>
          <InfoBox
          title="COVID Positive Cases Received"
          cases={numeral(stateInfo.actuals.newCases).format("0,0")}
          total={numeral(stateInfo.actuals.cases).format("0,0") + " Total"} />        
        </Grid>
        
        <Grid item lg>
        <InfoBox
          title="Deaths Reported Today"
          cases={numeral(stateInfo.actuals.newDeaths).format("0,0")}
          total={numeral(stateInfo.actuals.deaths).format("0,0") + " Total"} />        
        </Grid>
        
        <Grid item lg>
        <InfoBox
          title="Cases Currently Hospitalized"
          cases={numeral(stateInfo.actuals.hospitalBeds.currentUsageCovid).format("0,0")}   />     
        </Grid> 

        <Grid item lg>
        <InfoBox
          title="Cases Currently in ICU"
          cases={numeral(stateInfo.actuals.icuBeds.currentUsageCovid).format("0,0")}   />     
        </Grid> 

        <Grid item lg>
        <InfoBox
          title="Vaccines Distributed"
          cases={numeral(stateInfo.actuals.vaccinesDistributed).format("0,0")}   />     
        </Grid>

        <Grid item lg>
        <InfoBox
          title="Vaccines Initiated"
          cases={numeral(stateInfo.actuals.vaccinationsInitiated).format("0,0")}   />     
        </Grid>

        <Grid item lg>
        <InfoBox
          title="Vaccines Completed"
          cases={numeral(stateInfo.actuals.vaccinationsCompleted).format("0,0")}   />     
        </Grid>

        <Grid item lg>
        <InfoBox
          title="Population"
          cases={numeral(stateInfo.population).format("0,0")}   />     
        </Grid>

      </Grid>
      
    </div>
        </>

  );
}

export default StatesStats;
