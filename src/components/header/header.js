import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link as LinkRouter } from "react-router-dom";

import { makeStyles, Link, Button } from "@material-ui/core";

const styles = makeStyles(() => ({
    navbar: {
        position: "fixed",
        zIndex: 10,
        margin: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: "10px 0",
        backgroundColor: '#282e34',
    },
    logoContainer: {
        width: '8%'
    },
    logo: {
        width: '100%'
    },
    menuContainer: {
        width: '50%'
    },
    headerButtonsContainer: {
        width: '12%',
        // paddingRight: 40,
        justifyContent: "space-evenly",
        display: 'flex',
    },
    menu: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        listStyleType: 'none'
    },
    menuLink: {
        color: '#ddd'
    },
    sign: {
        background: '#fb9403',
        fontSize: '80%',
        color: '#282e34',
        '&:hover': {
            background: '#fb9403',
            opacity: 0.95,
        }
    }
}));

const Header = () => {

    const classes = styles();

    return (
        <header className={classes.navbar}>
            <div className={classes.logoContainer}>
                <a href='#'><img className={classes.logo} src="images/Logo.png" alt="Logo" title='Karoxa gites sax kyanqs taxi em qshel' /></a>
            </div>
            <div className={classes.menuContainer}>
                <ul className={classes.menu}>
                    <li className={classes.menuItem}>
                        <LinkRouter to="/">
                            <Link
                                underline='hover'
                                className={classes.menuLink}
                                href="#home"
                            >Home</Link>
                        </LinkRouter>
                    </li>
                    <li className='menu-list__item'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                            href="#about"
                        >About</Link>
                    </li>
                    <li className='menu-list__item'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                            href="#contact"
                        >Contacts</Link>
                    </li>
                </ul>
            </div>
            <div className={classes.headerButtonsContainer}>
                <LinkRouter to="/login">
                    <Button
                        variant='contained'
                        className={classes.sign}
                    >Log In</Button>
                </LinkRouter>
                <LinkRouter to="/signup">
                    <Button
                        variant='contained'
                        className={classes.sign}
                    >Sign Up</Button></LinkRouter>
            </div>
        </header>
    );
}

export default Header;