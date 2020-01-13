import React from 'react';
import { styles } from "./style";
import { Link, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector, connect } from 'react-redux';
import {openSignInAction, openSignUPAction} from '../sign_in/actions';



 function HeaderWhenUserLoggedOut(props) {

    const classes = styles();
    const dispatch =useDispatch();
    const StoreopenSignIn = useSelector(state => state.openSignIn);
    function handleSigninClick(){
        dispatch(openSignInAction())
    }
    function handleSignUPClick(){
        dispatch(openSignUPAction())
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
                <Button
                    variant='contained'
                    className={classes.sign}
                    onClick={handleSignUPClick}
                >Sign UP</Button>
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

function mapStateToProps(state) {
    return {
        willOpenSignIN: state.willOpenSignIN,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedOut)