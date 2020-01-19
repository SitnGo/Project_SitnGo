import React from 'react';
import { styles } from './style';
import { Link, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { signOutAction } from '../sign_in/actions';
import fire from '../../ConfigFirebase/Fire';


function HeaderWhenUserLoggedIn(props) {
    const dispatch = useDispatch();

    const classes = styles();
    function handleSignOut(){
        fire.auth().signOut().then(function() {
                    localStorage.clear()
                    localStorage.setItem('isLogged','false');
                    // localStorage.removeItem('userId')
                    return JSON.parse(localStorage.getItem('isLogged'))

        })
        .then((result)=>{
            dispatch(signOutAction(result))
        })
        .catch(function(error) {
            alert(error);
          });
    }
    return (
        <>
            <ul className={classes.menu} >
                <li className={classes.menuItem}>
                    <RouterLink to='/GetRout'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                        >Get Route</Link>
                    </RouterLink>
                </li>
                <li className={classes.menuItem}>
                    <RouterLink to='/offerRoute'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                        >Offer Route</Link>
                    </RouterLink>
                </li>
            </ul>
            <div className={classes.signButtonsContainer}>
                <RouterLink to='profile' className={classes.signButton}>
                    <Button
                        variant='text'
                        className={classes.profile}
                    >My Profile</Button>
                </RouterLink>
                <RouterLink to='/' className={classes.signButton}>
                    <Button
                        variant='contained'
                        className={classes.sign}
                        onClick={handleSignOut}
                    >Sign Out</Button>
                </RouterLink>
            </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
        user: state.user,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedIn)