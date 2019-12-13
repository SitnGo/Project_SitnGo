import React from 'react';
import {useStyles} from './style'
import { Fab } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.socialContainer}>
                <Fab size='small' target='_blank' href='https://github.com/SitnGo' className={classes.socialIcons}><GitHubIcon/></Fab >
                <Fab size='small' target='_blank' href='https://www.facebook.com/armcodeacademy/' className={classes.socialIcons}><FacebookIcon/></Fab >
                <Fab size='small' href='#' className={classes.socialIcons}><TwitterIcon/></Fab >
            </div>
            <div className={classes.copyrightContainer}>
                &copy; | All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;