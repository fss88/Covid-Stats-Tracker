import { useEffect, useState } from 'react';
import Table from './Table';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'



function RegionalStats() {
  
  const [continents, setContinents] = useState([]);
  // const [states, setStateData] = useState([]);


  // get worldwide data
  useEffect(() => {
    init();

    const interval = setInterval(() => {
      init()
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  const init = async () => {
    fetch('https://api.caw.sh/v3/covid-19/continents')
      .then(response => response.json())
      .then(data => {
        let sorted = data.sort((a, b) => parseInt(b.cases) - parseInt(a.cases));
        setContinents(sorted);
      })

    // fetch('https://api.caw.sh/v3/covid-19/continents')
    // .then(response => response.json())
    // .then(data => {
    //   setContinents(data)
    // })
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
      <Table continents={continents} />
      </Container>
    </>

  );
}

export default RegionalStats;
