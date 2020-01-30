import React from 'react';
import { Link, Button, Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../../actions';
import {isEdit1, openUpdateForm} from '../../actions/index';
import fire from '../../ConfigFirebase/Fire';
import styles from './style';

function HeaderWhenUserLoggedIn(props) {
    let isEditChecked = useSelector(state => state.isEdit1);
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
    function handleMyProfile () {
        if (isEditChecked === false) {
            dispatch(openUpdateForm());
            dispatch(isEdit1());

        }
    }
    return (
        <Grid
            container
            xl={11}
            lg={11}
            md={11}
            sm={10}
            xs={10}
            alignItems='center'
            alignContent='center'
            justify='space-evenly'
        >
            <Grid
                container
                xl={6}
                lg={6}
                md={6}
                sm={6}
                xs={6}
                alignItems='center'
                alignContent='center'
                justify='center'
            >
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
            </Grid>
            <Grid
                container
                xl={3}
                lg={3}
                md={3}
                sm={6}
                xs={6}
                justify='flex-end'
                className={classes.signButtonsContainer}
            >
                <RouterLink to='profile' className={classes.signButton}>
                    <Button
                        onClick={handleMyProfile}
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
    )
}
function mapStateToProps(state) {
    return {
        isLoggedInUser: state.isLoggedInUser,
        user: state.user,
    };
}
export default connect(mapStateToProps)(HeaderWhenUserLoggedIn)