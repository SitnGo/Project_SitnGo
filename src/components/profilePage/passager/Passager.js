import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography} from '@material-ui/core';
import { PinDropSharp } from '@material-ui/icons';
function Passager (props) {
    let {data} = props;
    console.log(data);
    return (
      <Card style={{width:"30%",margin:"5px"}}>
          <CardHeader avatar={<Avatar src='' />}  title="driver name" subheader="September 14, 2016"/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">from - {data.from}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">to - {data.to}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">distance - {data.distance}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">car model - {data.carModel}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">car number - {data.carNumber}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">price - {data.price}</Typography>
            </CardContent>
      </Card>
    );
}

export default Passager