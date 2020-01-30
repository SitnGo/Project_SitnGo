import React from 'react';
import {Typography, Grid} from '@material-ui/core';
import styles from './style';

function NotFound () {
    const classes = styles();
    return (
        <Grid 
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            className={classes.root}
            direction='row'
            justify='center'
            alignItems='center'
        >
            <Typography variant='h2' className={classes.text}>404 <br /> page not found</Typography>
            <div className={classes.imageCover}></div>
        </Grid>
    );
}

export default NotFound;