import React from 'react';
import {styles} from "./style";
import {Link, Button} from "@material-ui/core";
import {Link as RouterLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {loggedReducer} from '../sign_in/actions';
import fire from '../../ConfigFirebase/Fire';

const Header = (props) => {

    const classes = styles();
    const dispatch = useDispatch();

    function logout() {
       fire.auth().signOut();
       dispatch(loggedReducer());
   }


    return (
        <header className={classes.navbar}>
            <div className={classes.logoContainer}>
                <RouterLink to='/'><img className={classes.logo} src="images/Logo.png" alt="Logo"/></RouterLink>
            </div>
            <div className={classes.menuContainer}>
                <ul className={classes.menu}>
                    <li className={classes.menuItem}>
                        <RouterLink to='/'>
                            <Link
                                underline='hover'
                                className={classes.menuLink}
                            >Home</Link>
                        </RouterLink>
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
                {props.user ?
                 <Button
                        variant='contained'
                        className={classes.sign}
                        onClick = {logout}
                        //onClick={()=>props.setUser(null)}
                    >Logout</Button>
                    :
                    <>
                <RouterLink to='signup'>
                    <Button
                        variant='contained'
                        className={classes.sign}
                    >Sign Up</Button>
                </RouterLink>
                <Button
                    variant='contained'
                    className={classes.sign}
                    onClick={()=>{props.setOpen(true)}}
                >Sign In</Button>
                </>
                }
            </div>
        </header>
    );
}

export default Header;