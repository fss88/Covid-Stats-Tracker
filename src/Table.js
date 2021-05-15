import React from 'react';
import './Table.css';

function Table({countries}) {
    return (
        <div className="table">
            {countries.map(({country, cases}) => (
                // <tbody>
                    <tr>
                        <td>{country}</td>
                        <td>
                            <strong>{cases}</strong>
                        </td>
                    </tr>
                // </tbody>
                
            ))}
        </div>
    )
}

export default Table;
