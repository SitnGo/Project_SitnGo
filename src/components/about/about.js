import React from 'react';
import {Grid} from '@material-ui/core';
import styles from './style';

const About = () => {
    const classes = styles();
    return(
        <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            alignItems='center'
            alignContent='center'
            justify='space-around'
            className={classes.section}
        >
            <span className={classes.aboutId} id='about'></span>
            <div className={classes.textContainer}>
                <h1 className={classes.aboutHeader}>About Us</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className={classes.imageCover}></div>
        </Grid>
    );
};

export default About;