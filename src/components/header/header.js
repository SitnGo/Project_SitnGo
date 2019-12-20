import React from 'react';
import {styles} from "./style";
import {Link, Button, Switch} from "@material-ui/core";
import {Link as RouterLink, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {loggedReducer} from '../sign_in/actions';
import fire from '../../ConfigFirebase/Fire';

const Header = (props) => {

    const classes = styles();
    const dispatch = useDispatch();
    const store = useSelector(state => state.isLogged);
    function logout() {
       fire.auth().signOut();
       dispatch(loggedReducer());
   }


    return (
        <header className={classes.navbar}>
            <div className={classes.logoContainer}>
                <RouterLink to='/'><img className={classes.logo} src="images/Logo.png" alt="Logo"/></RouterLink>
            </div>
            <div className={classes.menuContainer}>
                <ul className={classes.menu}>
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
            </div>
            <div className={classes.headerButtonsContainer}>
                {store ?
                <>
                 <Button
                        variant='contained'
                        className={classes.sign}
                        onClick = {logout}
                        //onClick={()=>props.setUser(null)}
                    >Logout</Button>
                     
                    </>
                    :
                    <>
                <RouterLink to='signup'>
                    <Button
                        variant='contained'
                        className={classes.sign}
                    >Sign Up</Button>
                </RouterLink>
                <Button
                    variant='contained'
                    className={classes.sign}
                    onClick={()=>{props.setOpen(true)}}
                >Sign In</Button>
                </>
                }
            </div>
        </header>
    );
}

export default Header;