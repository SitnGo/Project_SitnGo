import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography} from '@material-ui/core';
import { PinDropSharp } from '@material-ui/icons';
function Driver (props) {
    // let {data} = props;
    // console.log(data);
    return (
      <Card style={{width:"30%",margin:"5px"}}>
          <CardHeader avatar={<Avatar src='' />}  title="Passager name" subheader="September 14, 2016"/>
            <CardContent>
                {/* <Typography variant="body2" color="textSecondary" component="p">passager - Arman</Typography> */}
                <Typography variant="body2" color="textSecondary" component="p">from - Yerevan</Typography>
                <Typography variant="body2" color="textSecondary" component="p">to - Aparan</Typography>
                <Typography variant="body2" color="textSecondary" component="p">distance - 60km</Typography>
                <Typography variant="body2" color="textSecondary" component="p">price - 3000AMD</Typography>
            </CardContent>
      </Card>
    );
}

export default Driver