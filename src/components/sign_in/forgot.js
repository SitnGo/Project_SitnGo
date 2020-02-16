import React, {useState} from 'react';
import {Button, Fab} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Close } from '@material-ui/icons';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fire from '../../ConfigFirebase/Fire';
import SimpleSnackbarSuccess from '../offerRoute/snackbar/snackbarSuccess';
import { styles } from './style';



export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isAnError, setIsAnError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailSuccess, setIsEmailSuccess] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setIsEmailSuccess(false);
    };

    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setErrorMessage('');
        setIsAnError(false);
    };

    const forgotPassword = () => {
        fire.auth().sendPasswordResetEmail(email)
            .then(function (u) {
                setOpen(false);
                setEmail('');
                setErrorMessage('');
                setIsAnError(false);
                setIsEmailSuccess(true);


            }).catch(function (e) {
            setIsAnError(true);
            setErrorMessage(e.message)
        })
    };

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            forgotPassword();
        }
    }

    return (
        <div>
            <Button variant='text' color='primary' onClick={handleClickOpen}>
                Forgot your password ?
            </Button> 
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Password recovery</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To get a verification code,
                        first confirm the recovery email address
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        fullWidth={true}
                        helperText ={isAnError === true ? errorMessage : null}
                        error={isAnError}
                        name = 'email'
                        value={email}
                        margin = 'dense'
                        color = 'primary'
                        variant = 'outlined'
                        label = 'Enter recovery email address'
                        onChange={e => {setEmail(e.target.value)}}
                        onKeyPress = {e => {handleEnter(e)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        style={styles.signButton}
                        onClick={forgotPassword}
                    >Send</Button>
                    <Fab onClick={handleClose}
                         position = 'absolute'
                         color='primary'
                         size='small'
                         style={styles.close}
                    ><Close/></Fab>
                </DialogActions>
            </Dialog>
            {isEmailSuccess ? <SimpleSnackbarSuccess isRouteSuccess={isEmailSuccess} text='Please check your email...'/> : null}
        </div>
    );
}