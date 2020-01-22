import React, {useEffect,useState} from 'react';
import {Link as RouterLink} from 'react-router-dom'
import HeaderWhenUserLoggedIn from './HeaderWhenUserLoggedIn'
import HeaderWhenUserLoggedOut from './HeaderWhenUserLoggedOut'
import { useDispatch, useSelector} from 'react-redux';
import fire from '../../ConfigFirebase/Fire';
import { signOutAction } from '../sign_in/actions';
import {useCookies} from 'react-cookie';
import { connect } from 'react-redux';
import { SignInAction } from '../sign_in/actions';
import styles from './style';


function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
        user: state.user,
    };
}

const Header = (props) => {
    const [isLogged, setIsLogged] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['loginPassword']);

    const classes = styles();
    const dispatch = useDispatch();
    let user = useSelector((state)=> state.user);

    return(
    <header className={classes.navbar}>
        {console.log(props.user)}
            <div className={classes.logoContainer}>
                <RouterLink to= {JSON.parse(localStorage.getItem('isLogged')) ? '/profile' : '/'}><img className={classes.logo} src='images/Logo.png' alt='Logo'/></RouterLink>
            </div>
                {props.user ? <HeaderWhenUserLoggedIn /> : <HeaderWhenUserLoggedOut /> }
        </header>
    );
}

export default connect(mapStateToProps)(Header);