import React from 'react';
import { styles } from "./style";
import { Link, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, useSelector, connect } from 'react-redux';
import {openSignInAction, openSignUPAction} from '../sign_in/actions';
// import { loggedReducer } from '../sign_in/actions';
// import openSignInReducer from '../sign_in/reducers/openSignIn';



 function HeaderWhenUserLoggedOut(props) {

    const classes = styles();
    const dispatch =useDispatch();
    const StoreopenSignIn = useSelector(state => state.openSignIn);
    function handleSigninClick(){
        console.log(props)
        // props.setOpenSignInBox(true);
        dispatch(openSignInAction())
    }
    function handleSignUPClick(){
        // props.setOpenSignUPBox(true);
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

function mapStateToProps(state) {
    return {
        willOpenSignIN: state.willOpenSignIN,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedOut)