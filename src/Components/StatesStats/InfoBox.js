import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css';

function InfoBox({title, cases, total, ...props}) {
    return (
        <div >
            <Card 
            className="infoCard" >
            <CardContent >
                {/* Title */}
                <Typography className="infoBox__title" >
                    {title} <small></small>
                </Typography>
                
                {/* Number of cases:Number */}
                <h2 className="infoBox__cases"> <small>{cases}</small> </h2>
                
                {/* Total:Number */}

                <Typography className="infoBox__total" >
                    {total}
                </Typography>


            </CardContent>
        </Card>
        </div>
        
    )
}

export default InfoBox;
