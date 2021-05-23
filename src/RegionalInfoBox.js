import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css';

function RegionalInfoBox({title, cases, total, ...props}) {
    return (
        <div style={{flex: 1}}>
            <Card 
            onClick={props.onClick}
            className="infoCard" >
            <CardContent >
                {/* Title */}
                <Typography className="infoBox__title" >
                    {title}
                </Typography>
                
                {/* Number of cases:Number */}
                <h2 className="infoBox__cases"> <small>{cases}</small> </h2>
                
                {/* Total:Number */}

                <Typography className="infoBox__total" >
                    <h3>{total}</h3> Total
                </Typography>


            </CardContent>
        </Card>
        </div>
        
    )
}

export default RegionalInfoBox;
