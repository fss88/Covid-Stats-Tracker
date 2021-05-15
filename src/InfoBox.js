import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoBox.css';

function InfoBox({title, cases, total}) {
    return (
        <div >
            <Card >
            <CardContent>
                {/* Title */}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                
                {/* Number of cases:Number */}
                <h2 className="infoBox__cases">{cases}</h2>
                
                {/* Total:Number */}

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>


            </CardContent>
        </Card>
        </div>
        
    )
}

export default InfoBox;
