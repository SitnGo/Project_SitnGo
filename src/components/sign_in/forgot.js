import React, {useState} from 'react';
import {Button, Fab} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Close } from '@material-ui/icons';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import fire from '../../ConfigFirebase/Fire';
import { styles } from './style';



export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isAnError, setIsAnError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEmail('');
        setErrorMessage('');
    };

    const forgotPassword = () => {
        fire.auth().sendPasswordResetEmail(email)
            .then(function (u) {
                alert('Please check your email...')
            }).catch(function (e) {
            setIsAnError(true);
            setErrorMessage(e.message)
        })
    };

    const handleEnter = (e) => {
        if(e.key == 'Enter'){
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
                        fullWidth='true'
                        helperText ={(isAnError === true) ? <div style={styles.error}>{errorMessage}</div> : null}
                        autofocus
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
        </div>
    );
}