import React from 'react';
import styles from './style'
import { Fab, Grid } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
    const classes = styles();
    return (
        <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            alignItems='center'
            alignContent='center'
            justify='space-between'
            className={classes.footer}
        >
            <Grid
                xl={5}
                lg={5}
                md={5}
                sm={5}
                xs={5}
                className={classes.socialContainer}
            >
                <Fab size='small' target='_blank' href='https://github.com/SitnGo' className={classes.socialIcons}><GitHubIcon/></Fab >
                <Fab size='small' target='_blank' href='https://www.facebook.com/armcodeacademy/' className={classes.socialIcons}><FacebookIcon/></Fab >
                <Fab size='small' href='#' className={classes.socialIcons}><TwitterIcon/></Fab >
            </Grid>
            <Grid
                xl={2}
                lg={3}
                md={3}
                sm={4}
                xs={5}
                className={classes.copyrightContainer}
            >
                &copy; | All Rights Reserved.
            </Grid>
        </Grid>
    );
}

export default Footer;