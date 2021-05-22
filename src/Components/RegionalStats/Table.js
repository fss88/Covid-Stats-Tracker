import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({continents}) {
    return (
        <div className="table">
            {/* <table> */}
                <tr>
                    <th>Continent</th>
                    <th>Confirmed Cases</th>
                    <th>Active</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                </tr>
            {/* </table> */}
             {continents.map((continent) => (
                
                <tr>
                    <td>{continent.continent}</td>
                    <td>
                        <strong>{numeral(continent.cases).format("0,0")}</strong>
                    </td>
                    <td>{continent.active}</td>
                    <td>{continent.recovered}</td>
                    <td>{continent.deaths}</td>
                </tr>
      ))}
        </div>
    )
}

export default Table