import React from 'react';
import { styles } from "./style";
import { Link, Button } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { loggedAction } from '../sign_in/actions';



function HeaderWhenUserLoggedIn(props) {
    const dispatch = useDispatch();

    const classes = styles();
    function handleSignOut(){
        dispatch(loggedAction())
        console.log(props)
    }
    return (
        <>
            <ul className={classes.menu} >
                <li className={classes.menuItem}>
                    <RouterLink to='/'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                        >Get Route</Link>
                    </RouterLink>
                </li>
                <li className={classes.menuItem}>
                    <RouterLink to='/'>
                        <Link
                            underline='hover'
                            className={classes.menuLink}
                        >Offer Route</Link>
                    </RouterLink>
                </li>
            </ul>

            <div className={classes.signButtonsContainer}>
                <RouterLink to='ProfilePage' className={classes.signButton}>
                    <Button
                        variant='text'
                        className={classes.profile}
                    >My Profile</Button>
                </RouterLink>
                <Button
                    variant='contained'
                    className={classes.sign}
                    onClick={handleSignOut}
                >Sign Out</Button>
            </div>
        </>
    )
}
function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedIn)