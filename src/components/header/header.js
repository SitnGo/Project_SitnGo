import React, {useEffect} from 'react';
import {styles} from "./style";
import {Link as RouterLink} from 'react-router-dom'
import HeaderWhenUserLoggedIn from './HeaderWhenUserLoggedIn'
import HeaderWhenUserLoggedOut from './HeaderWhenUserLoggedOut'
import { connect } from 'react-redux';

const Header = (props) => {
    const classes = styles();
    return(
    <header className={classes.navbar}>
        {console.log(props)}
            <div className={classes.logoContainer}>
                <RouterLink to='/'><img className={classes.logo} src="images/Logo.png" alt="Logo"/></RouterLink>
            </div>
                {props.isLoggedInUser ? <HeaderWhenUserLoggedIn  /> : <HeaderWhenUserLoggedOut /> }
        </header>
    );
}
function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
        user: state.user,
    };
}

export default connect(mapStateToProps)(Header);