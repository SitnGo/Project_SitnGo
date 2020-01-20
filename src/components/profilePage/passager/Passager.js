import React from 'react'
import {Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, Typography} from '@material-ui/core';
function Passager () {
    return (
      <Card>
          <CardHeader avatar={<Avatar src='' />} />
            
              <Typography>arman</Typography>
         
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p"> 
                This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.</Typography>
            </CardContent>
      </Card>
    );
}

export default Passager