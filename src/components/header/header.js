import React from 'react';
import {Link as RouterLink} from 'react-router-dom'
import HeaderWhenUserLoggedIn from './HeaderWhenUserLoggedIn'
import HeaderWhenUserLoggedOut from './HeaderWhenUserLoggedOut'
import { useSelector} from 'react-redux';
import { connect } from 'react-redux';
import {Grid} from '@material-ui/core';
import styles from './style';


function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
        user: state.user,
    };
}

const Header = (props) => {
    const classes = styles();
    let user = useSelector((state)=> state.user);

    return(
        <Grid
            container
            alignItems='center'
            alignContent='center'
            justify='space-evenly'
            className={classes.navbar}
        >
            <Grid
                item
                xl={1}
                lg={1}
                md={1}
                sm={2}
                xs={2}
                className={classes.logoContainer}
            >
                <RouterLink to='/'><img className={classes.logo} src='images/Logo.png' alt='Logo'/></RouterLink>
            </Grid>
            <Grid
                item
                xl={11}
                lg={11}
                md={11}
                sm={10}
                xs={10}
            >
                {user ? <HeaderWhenUserLoggedIn /> : <HeaderWhenUserLoggedOut /> }
            </Grid>
        </Grid>
    );
}

export default connect(mapStateToProps)(Header);