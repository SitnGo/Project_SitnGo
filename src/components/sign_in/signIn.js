import React, { useState, useEffect } from 'react';
import fire from '../../ConfigFirebase/Fire';
import { Button, Fab } from '@material-ui/core/';
import { Typography,TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff, Email, Close } from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';
import { useDispatch, useSelector, connect} from 'react-redux';
import { SignInAction } from './actions';
import FormDialog from './forgot';
import { openSignInAction } from './actions'
import {styles} from './style';
import { Link as RouterLink, withRouter } from 'react-router-dom'
import {useCookies} from 'react-cookie';

export function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnError, setIsAnError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['loginPassword']);
    const setIsErsed = props.setIsErsed;
    const handleClose = () => {
        dispatch(openSignInAction())
        setEmail('');
        setPassword('');
        setErrorMessage('')
    };

    const handleChange = name => event => {
        setChecked(event.target.checked);
    };
    let Id = useSelector(state=>state.userId)

    function login() {
        let loginPassword = {email: email, password: password}
        console.log(loginPassword)
        fire.auth().signInWithEmailAndPassword(email, password)
            .then(a => {
                async function getMarker(user={}) {
                    const userId = fire.auth().currentUser.uid;
                    user = await fire.firestore().collection('users').doc(userId).get()
                    user = user.data();
                    localStorage.setItem('isLogged','true');
                    setCookie('loginPassword', loginPassword, { path: '/' });
                    localStorage.setItem('userId',userId);
                    return user;
                }
                getMarker().then(result => {
                    dispatch(SignInAction(result, JSON.parse(localStorage.getItem('isLogged'))));
                    dispatch(openSignInAction());
                });
                props.history.push('/profile');

                setIsAnError(false);
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                setIsAnError(true);
                setErrorMessage(error.message)
            });
    }

    function signup(e) {
        e.preventDefault()
        fire.auth().createUserWithEmailAndPassword(email, password).then((u) => {
        }).then((u) => { console.log(u) })
            .catch(error => {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        console.log(`Email address ${email} already in use.`);
                        setIsAnError(true);
                        setErrorMessage(`Email address ${email} already in use.`);
                        break;
                    case 'auth/invalid-email':
                        console.log(`Email address ${email} is invalid.`);
                        setIsAnError(true);
                        setErrorMessage(`Email address ${email} is invalid.`);
                        break;
                    case 'auth/operation-not-allowed':
                        console.log(`Enterance is denied.`);
                        setIsAnError(true);
                        setErrorMessage(`Entrance is denied`);
                        break;
                    case 'auth/weak-password':
                        console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                        setIsAnError(true);
                        setErrorMessage(`Password is not strong enough.`)
                        break;
                    default:
                        console.log(error.message);
                        setIsAnError(true);
                        break;
                }
            });
    }
    return (
        <div>
            <div style={styles.signInContainer}>
                <Typography
                    variant='h3'
                    component='h3'
                    margin='normal'
                >Sign in</Typography>
                <TextField
                    fullWidth='true'
                    size='large'
                    autoFocus
                    required
                    name='email'
                    value={email}
                    margin='dense'
                    color='primary'
                    variant='outlined'
                    label='Email'
                    onChange={e => setEmail(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle'
                                    edge='end'
                                >
                                    <Email />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    fullWidth='true'
                    required
                    helperText= {(isAnError === true) ? <div style={styles.error}>{errorMessage}</div> : null}
                    name='password'
                    margin='dense'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    color='primary'
                    variant='outlined'
                    label='Password'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => { showPassword ? setShowPassword(false) : setShowPassword(true) }}
                                    edge='end'
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div>
                    <Checkbox
                        checked={checked}
                        onChange={handleChange(checked)}
                        value='checked'
                        style={styles.checkbox}
                        inputProps={{
                            'aria-label': 'secondary checkbox',
                        }}/>
                </div>
                <div style={styles.signContainer}>
                    <Button type='submit'  style={styles.signButton} onClick={login}> Sign In </Button>
                    <Button onClick={signup} style={styles.signButton}>Sign up</Button>
                </div>
                <Fab onClick={handleClose}
                     size='small'
                     position = 'absolute'
                     style={styles.close}><Close/></Fab>
                <FormDialog />
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        user: state.user,
        willOpenSignIN: state.willOpenSignIN,
        isLoggedInUser: state.isLoggedInUser,
    };
}
let signInWithRouter = withRouter(SignIn);
export default connect(mapStateToProps)(signInWithRouter);