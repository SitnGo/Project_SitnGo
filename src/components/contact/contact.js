import React from 'react';
import {classes} from "./style";
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

const Contact = () => {
    return(
        <section style={classes.section}>
            <span style={classes.aboutId} id='contact'></span>
            <div style={classes.textContainer}>
                <h1 style={classes.aboutHeader}>Contact Us</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                    been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div className={classes.iconsBlock1}>
                <div className={classes.leftSideIconsBlock}>
                    <RoomIcon className={classes.icon}/>
                    <p className={classes.leftSideP}>Hakob Hakobyan</p>
                </div>
                <div className={classes.leftSideIconsBlock}>
                    <PhoneIcon className={classes.icon}/>
                    <p className={classes.leftSideP}>+131-937-12</p>
                </div>
                <div className={classes.leftSideIconsBlock}>
                    <MailIcon className={classes.icon}/>
                    <p className={classes.leftSideP}>support@gmail.com</p>
                </div>
            </div>
            <div style={classes.imageCover}></div>
        </section>
    );
};

export default Contact;