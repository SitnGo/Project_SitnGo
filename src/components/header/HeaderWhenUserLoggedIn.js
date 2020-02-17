import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { signOutAction } from '../../actions';
import fire from '../../ConfigFirebase/Fire';
import styles from './style';

function HeaderWhenUserLoggedIn(props) {
    const dispatch = useDispatch();
    const classes = styles();
    
    function handleSignOut(){
        fire.auth().signOut().then(function() {
            localStorage.clear()
        })
        .then((result)=>{
            dispatch(signOutAction(result))
        })
        .catch(function(error) {
            alert(error);
          });
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
                xs={6}
            >
                <ul className={classes.menu} >
                    <li className={classes.menuItem}>
                        <RouterLink to='/GetRout' className={classes.menuLink}>
                            Get Route
                        </RouterLink>
                    </li>
                    <li className={classes.menuItem}>
                        <RouterLink to='/offerRoute' className={classes.menuLink}>
                            Offer Route
                        </RouterLink>
                    </li>
                </ul>
            </Grid>
            <Grid
                item
                xl={3}
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className={classes.signButtonsContainer}
            >
                <Grid
                    container
                    justify='space-evenly'
                >
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
                </Grid>
            </Grid>
        </Grid>
    )
}
function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
        user: state.user,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedIn)