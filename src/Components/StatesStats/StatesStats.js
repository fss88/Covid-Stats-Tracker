import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import './StatesStats.css';
import { formatStats } from './utilis';
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral';
import Grid from '@material-ui/core/Grid';
import Bargraph1 from './Bargraph1';
import LineGraph2 from './LineGraph2';
import TableStates from './TableStates';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function StatesStats() {

  const classes = useStyles();
  // const [states, setStates] = useState([]);
  // // const [state, setState] = useState('CA');
  // const [stateInfo, setStateInfo] = useState({});
  const [states, setStateData] = useState([]);
  const [stateInfo, setStateInfo] = useState({});

  const [state, setSelectedState] = useState('USA');
  const [casesType, setCasesType] = useState('cases');
  const [allStates, setAllStates] = useState([]);
  
  useEffect(() => {
    init();

    const interval = setInterval(() => {
      init()
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const init = async () => {
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
  }

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
  // useEffect(() => {
  //send request to get CA data
  
//   const initialFetch = async () => {
//     fetch('https://api.covidactnow.org/v2/state/CA.json?apiKey=fa4e0a37946e4caa8692c487250889cb')
//       .then(response => response.json())
//       .then(data => {
//         setStateInfo(data);
//       })
//   };
//   initialFetch();
//   }, []);

// useEffect(() => {
//   // Send an async request to get all states' data, wait for the response and use that response

//   const getAllStatesData = async () => {
//     await fetch('https://api.covidactnow.org/v2/states.json?apiKey=fa4e0a37946e4caa8692c487250889cb')
//     .then((response) => response.json())
//     .then((data) => {
//         const statesData = data.map((state) => ({
//           name: state.state,
//           value: state.state,
//         }));

//         setStates(statesData);
//       });
//   };

//   getAllStatesData();
// }, []);


// const onStateChange = async (e) => {
//     const stateCode = e.target.value;

//     const url = `https://api.covidactnow.org/v2/state/${stateCode}.json?apiKey=fa4e0a37946e4caa8692c487250889cb`;
//       await fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//           setState(stateCode);
//           setStateInfo(data);
     
//       });
// };

// console.log(stateInfo);

  return (
  <div>
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
      
      <Grid container spacing={3}>
        <Grid item md>
        <CssBaseline />
      <Container maxWidth="lg">
        <LineGraph2
          data={state}
        />
      </Container>
        </Grid>
        <Grid item md>
        <CssBaseline />
      <Container maxWidth="lg">
        <Bargraph1
          data={state}
        />
      </Container>        </Grid>
      </Grid>
      <Grid container spacing={3}>
        
        <Grid item md>
        <CssBaseline />
        <h3>COVID-19 in Different States</h3>
          <TableStates
            states={allStates}
          />
        </Grid>
        
      </Grid>
        
  </div>
  )
};

export default StatesStats;
