import React from 'react';
import {Typography, Grid} from '@material-ui/core';
import useStyles from './style';

function NotFound () {
    const classes = useStyles();
    return (
        <Grid container sm={12} className={classes.root}
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