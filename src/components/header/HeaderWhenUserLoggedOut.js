import React from 'react';
import { styles } from "./style";
import { Link, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {openSignInAction} from '../sign_in/actions';
// import { loggedReducer } from '../sign_in/actions';
// import openSignInReducer from '../sign_in/reducers/openSignIn';



export default function HeaderWhenUserLoggedOut(props) {

    const classes = styles();
    const dispatch =useDispatch();
    const StoreopenSignIn = useSelector(state => state.openSignIn);
    function handleSigninClick(){
        props.setOpenSignInBox(true);
    }
    function handleSignUPClick(){
        props.setOpenSignUPBox(true);
    }
    return (
        <>
            <ul className={classes.menu} >
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

            <div className={classes.signButtonsContainer}>
                {/*<RouterLink to='signup' className={classes.signButton}>*/}
                <Button
                    variant='contained'
                    className={classes.sign}
                    onClick={handleSignUPClick}
                >Sign UP</Button>
                {/*</RouterLink>*/}
                <RouterLink to='#' className={classes.signButton}>
                    <Button
                        variant='contained'
                        className={classes.sign}
                    onClick={handleSigninClick}
                    >Sign in</Button>
                </RouterLink>
            </div>
        </>
    )
}