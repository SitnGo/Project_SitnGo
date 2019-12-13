import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles(theme =>({
    footer: {
        backgroundColor:'#424242',
        display:"flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        width:"100%",
        maxHeight: '10vh',
        padding: '30px',
        position: 'relative',
        zIndex: 1000,
        bottom: 0,
    },
    socialIcons: {
        backgroundColor: '#fb9403',
        marginRight: '10px',
        color:"#282e34",
        fontSize: '30px',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    },
    socialContainer: {
        width: "20%",
        textAlign:"center",
    },
    copyrightContainer: {
        width: "30%",
        fontSize: '20px',
        color: '#ddd'
    }
}));
function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <div className={classes.socialContainer}>
                <Fab  href='#' className={classes.socialIcons}><GitHubIcon/></Fab >
                <Fab  href='#' className={classes.socialIcons}><FacebookIcon/></Fab >
                <Fab  href='#' className={classes.socialIcons}><TwitterIcon/></Fab >
            </div>
            <div className={classes.copyrightContainer}>
                &copy; | All Rights Reserved.
            </div>
        </footer>
    );
}

export default Footer;