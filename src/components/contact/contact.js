import React from 'react';
import styles from './style';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import AppMap from '../AppMap/AppMap';

const Contact = () => {
    const classes = styles();
    return(
        <section className={classes.section}>
            <span className={classes.contactId} id='contact'></span>
            <div className={classes.textContainer}>
                <h1 className={classes.contactHeader}>Contact Us</h1>
                <div className={classes.mapContainer}>
                    <AppMap/>
                </div>
            </div>
            <div className={classes.contactsContainer}>
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
            </div>
            <div className={classes.imageCover}></div>
        </section>
    );
};

export default Contact;