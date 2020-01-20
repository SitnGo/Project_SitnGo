import React from 'react';
import {classes} from './style';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import AppMap from '../AppMap/AppMap';

const Contact = () => {
    return(
        <section style={classes.section}>
            <span style={classes.contactId} id='contact'></span>
            <div style={classes.textContainer}>
                <h1 style={classes.contactHeader}>Contact Us</h1>
                <div style={classes.mapContainer}>
                    <AppMap/>
                </div>
            </div>
            <div style={classes.contactsContainer}>
                <div style={classes.contacts}>
                    <RoomIcon fontSize='large' style={classes.icon}/>
                    <p style={classes.contactsText}>Hakob Hakobyan 3</p>
                </div>
                <div style={classes.contacts}>
                    <PhoneIcon fontSize='large' style={classes.icon}/>
                    <p style={classes.contactsText}>(012) 48-16-32</p>
                </div>
                <div style={classes.contacts}>
                    <MailIcon fontSize='large' style={classes.icon}/>
                    <p style={classes.contactsText}>info@aca.am</p>
                </div>
            </div>
            <div style={classes.imageCover}></div>
        </section>
    );
};

export default Contact;