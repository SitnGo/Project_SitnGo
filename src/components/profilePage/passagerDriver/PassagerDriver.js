import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography} from '@material-ui/core';
// import { Alert, AlertTitle } from '@material-ui/lab/';

function PassagerPassagerDriver (props) {
    let {data} = props;
    let startEnd = data.astartEnd.split("-");
    return (
      <Card style={{width:"30%",margin:"5px"}}>
          <CardHeader avatar={<Avatar src='' />}  title={data.parameters.name} subheader={data.startDate}/>
            <CardContent>              
                <Typography variant="body2" color="textSecondary" component="p">from - {startEnd[0]}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">to - {startEnd[1]}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">distance - {data.parameters.distance}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">car model - {data.parameters.car}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">car number - {data.parameters.plate}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">price - {data.parameters.price}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">Driver Phone - {data.DriverPhone}</Typography>
            </CardContent>
      </Card>
    );
}

export default PassagerPassagerDriver;