import React, {useEffect,useState} from 'react';
import {styles} from "./style";
import {Link as RouterLink} from 'react-router-dom'
import HeaderWhenUserLoggedIn from './HeaderWhenUserLoggedIn'
import HeaderWhenUserLoggedOut from './HeaderWhenUserLoggedOut'
import { useDispatch} from 'react-redux';
import fire from '../../ConfigFirebase/Fire';
import { signOutAction } from '../sign_in/actions';
import {useCookies} from 'react-cookie';





import { connect } from 'react-redux';
import { SignInAction } from '../sign_in/actions';

const Header = (props) => {
    const [isLogged, setIsLogged] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['loginPassword']);

    const classes = styles();
    const dispatch = useDispatch();

    return(
    <header className={classes.navbar}>
            <div className={classes.logoContainer}>
                <RouterLink to='/'><img className={classes.logo} src="images/Logo.png" alt="Logo"/></RouterLink>
            </div>
                {JSON.parse(localStorage.getItem("isLogged")) ? <HeaderWhenUserLoggedIn /> : <HeaderWhenUserLoggedOut /> }
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