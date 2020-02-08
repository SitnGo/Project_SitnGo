import React, {useState} from 'react';
import fire from '../../ConfigFirebase/Fire';
import { Button, Fab } from '@material-ui/core/';
import { Typography,TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff, Email, Close } from '@material-ui/icons';
import { useDispatch, connect} from 'react-redux';
import FormDialog from './forgot';
import { openSignInAction, SignInAction, openSignUPAction } from '../../actions'
import { styles } from './style';
import {withRouter } from 'react-router-dom'
export function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAnError, setIsAnError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(openSignInAction())
        setEmail('');
        setPassword('');
        setErrorMessage('')
    };

    function login() {
        fire.auth().signInWithEmailAndPassword(email, password)
            .then(a => {
                async function getMarker(user={}) {
                    const userId = fire.auth().currentUser.uid;
                    user = await fire.firestore().collection('users').doc(userId).get()
                    user = user.data();
                    return user;
                }
                getMarker().then(result => {
                    dispatch(SignInAction(result));
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
        dispatch(openSignInAction());
        dispatch(openSignUPAction());
    }

    const handleEnter = (e) => {
        if(e.key == 'Enter'){
            login();
        }
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
                    fullWidth={true}
                    size='medium'
                    autoFocus
                    required
                    name='email'
                    value={email}
                    margin='dense'
                    color='primary'
                    variant='outlined'
                    label='Email'
                    onChange={e => setEmail(e.target.value)}
                    onKeyPress = {e => {handleEnter(e)}}
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
                    fullWidth={true}
                    required
                    helperText= {(isAnError === true) ? <div style={styles.error}>{errorMessage}</div> : null}
                    name='password'
                    margin='dense'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyPress = {e => {handleEnter(e)}}
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