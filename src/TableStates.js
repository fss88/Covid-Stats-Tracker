import React from 'react';
import numeral from 'numeral';
import './Table.css';

function TableStates({states}) {
    return (
        <div className="table">
            {/* <table> */}
                <tr style={{padding: '10px'}}>
                    <th>country</th>
                    <th>Confirmed Cases</th>
                    <th>Active</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                </tr>
             {states.map((country) => (
                
                <tr>
                    <td>{country.state}</td>
                    <td>
                        <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                    <td>{country.active}</td>
                    <td>{country.recovered}</td>
                    <td>{country.deaths}</td>
                </tr>
                
      ))} 
        </div>
    )
}

export default TableStates