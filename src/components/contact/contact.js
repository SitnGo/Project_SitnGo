import React from 'react';
import styles from './style';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import {Grid} from '@material-ui/core';
import Lapp from '../contact/firstPageMap'
const Contact = () => {
    const classes = styles();
    return(
        <Grid
            container
            alignItems='center'
            alignContent='center'
            justify='space-evenly'
            className={classes.section}
        >
            <span className={classes.contactId} id='contact'></span>
            <Grid
                item
                xl={8}
                lg={8}
                md={8}
                sm={6}
                xs={6}
                className={classes.textContainer}
            >
                <h1 className={classes.contactHeader}>Contact Us</h1>
                <Grid
                    item
                    xs={12}
                    className={classes.mapContainer}
                >
                    <Lapp/>
                </Grid>
            </Grid>
            <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={5}
                xs={5}
                className={classes.contactsContainer}
            >
                <div className={classes.contacts}>
                    <RoomIcon fontSize='large' className={classes.icon}/>
                    <p className={classes.contactsText}>Hakob Hakobyan 3</p>
                </div>
                <div className={classes.contacts}>
                    <PhoneIcon fontSize='large' className={classes.icon}/>
                    <p className={classes.contactsText}>(012) 48-16-32</p>
                </div>
                <div className={classes.contacts}>
                    <MailIcon fontSize='large' className={classes.icon}/>
                    <p className={classes.contactsText}>info@aca.am</p>
                </div>
            </Grid>
            <div className={classes.imageCover}></div>
        </Grid>
    );
};

export default Contact;