import React from 'react';
import {makeStyles, Link, Button} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom'

const styles = makeStyles(() => ({
    navbar: {
        width: '100%',
        maxHeight: '10vh',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282e34',
        position: 'relative',
        zIndex: 1000,
    },
    logoContainer: {
        width: '8%'
    },
    logo: {
        width: '100%'
    },
    menuContainer: {
        width: '82%'
    },
    headerButtonsContainer: {
        width: '10%'
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

    return(
        <header className={classes.navbar}>
            <div className={classes.logoContainer}>
                <a href='#'><img className={classes.logo} src="images/Logo.png" alt="Logo"/></a>
            </div>
            <div className={classes.menuContainer}>
                <ul className={classes.menu}>
                    <li className={classes.menuItem}>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                            href="#"
                        >Home</Link>
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
                <RouterLink to='signup'>
                    <Button
                        variant='contained'
                        className={classes.sign}
                    >Sign In</Button>
                </RouterLink>
            </div>
        </header>
    );
}

export default Header;