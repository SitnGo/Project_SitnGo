import React from 'react';
import { Link, Button, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux';
import {openSignInAction, openSignUPAction} from '../../actions';
import styles from './style';

function HeaderWhenUserLoggedOut() {
    const classes = styles();
    const dispatch =useDispatch();
    function handleSigninClick(){
        dispatch(openSignInAction())
    }
    function handleSignUPClick(){
        dispatch(openSignUPAction())
    }
    return (
        <Grid
            container
            alignItems='center'
            alignContent='center'
            justify='space-evenly'
        >
            <Grid
                item
                xs={7}
            >
                <ul className={classes.menu} >
                    <li className={classes.menuItem}>
                        <RouterLink to='/' className={classes.menuLink}>
                           Home
                        </RouterLink>
                    </li>
                    <li className='menu-list__item'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                            href='#about'
                        >About</Link>
                    </li>
                    <li className='menu-list__item'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                            href='#contact'
                        >Contacts</Link>
                    </li>
                </ul>
            </Grid>
            <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={5}
                xs={5}
                className={classes.signButtonsContainer}
            >
                <Grid
                    container
                    alignItems='center'
                    justify='space-evenly'
                >
                    <Button
                        variant='contained'
                        className={classes.sign}
                        onClick={handleSignUPClick}
                    >
                        Sign UP
                    </Button>
                    <RouterLink to='#' className={classes.signButton}>
                        <Button
                            variant='contained'
                            className={classes.sign}
                            onClick={handleSigninClick}
                        >
                            Sign in
                        </Button>
                    </RouterLink>
                </Grid>
            </Grid>
        </Grid>
    )
}

function mapStateToProps(state) {
    return {
        willOpenSignIN: state.willOpenSignIN,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedOut)