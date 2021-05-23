import React from 'react';
import numeral from 'numeral';
import './Table.css';

function Table({continents}) {
    return (
        <div className="table">
            {/* <table> */}
                <tr>
                    <th style={{color: "black"}}>Continent</th>
                    <th style={{color: "black"}}>Confirmed Cases</th>
                    <th style={{color: "red"}}>Active</th>
                    <th style={{color: "green"}}>Recovered</th>
                    <th style={{color: "purple"}}>Deaths</th>
                </tr>
            {/* </table> */}
             {continents.map((continent) => (
                
                <tr>
                    <td>{continent.continent}</td>
                    <td>
                        {numeral(continent.cases).format("0,0")}
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