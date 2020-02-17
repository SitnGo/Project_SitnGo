import React from 'react';
import {Grid} from '@material-ui/core';
import styles from './style';

const About = () => {
    const classes = styles();
    return(
        <Grid
            container
            alignItems='center'
            alignContent='center'
            justify='space-around'
            className={classes.section}
        >
            <span className={classes.aboutId} id='about'></span>
            <div className={classes.textContainer}>
                <h1 className={classes.aboutHeader}>About Us</h1>
                <p>
                SitnGo is an online carpooling system (web-based app) that provides a simple riding platform for car owners and passengers. This project enables users to access mobility assets owned by others at the exact time they need it. SitnGo personal ride booking and sharing service maps the available cars in the area, their capacities, intended routes and destinations, allowing customers to arrange their transportation quickly.
                Ride booking via SitnGo is typically done via smartphone where GPS technology matches the customer’s location with the available car.
                In this online system, the customer receives an estimated pickup time and a description of the arriving vehicle. Users can pay the cost upon their arrival at the destination.

                </p>
            </div>
            <div className={classes.imageCover}></div>
        </Grid>
    );
};

export default About;