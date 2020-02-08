import React from 'react';
import {Typography, Grid} from '@material-ui/core';
import styles from './style';

function NotFound () {
    const classes = styles();
    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='center'
        >
            <Grid
                item
                xs={12}
                className={classes.root}
            >
                <Typography variant='h2' className={classes.text}>404 <br /> page not found</Typography>
                <div className={classes.imageCover}></div>
            </Grid>
        </Grid>
    );
}

export default NotFound;