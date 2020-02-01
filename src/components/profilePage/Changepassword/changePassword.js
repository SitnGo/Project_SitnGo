import React, {useState} from 'react';
import fire from '../../../ConfigFirebase/Fire'
import styles from './style';
import {
        Button, 
        TextField, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle
} from '@material-ui/core';

function ChangePassword(props) {
    const classes = styles();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const handleUpdate = () => {
        if (email === fire.auth().currentUser.email) {
            fire.auth().sendPasswordResetEmail(email).then(function() {
                alert('Please check your email...');
            }).catch(function(error) {
                alert('An Error occurred');
            });
            setEmailError(false); 
            props.setOpen(false);
            setEmail('');
        } else {
            setEmailError(true);
        }
    };
    const handleClose = () => {
        props.setOpen(false);
        setEmail('');
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    };
        
    return (
        <>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Reset password</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            To get a verification code, first confirm the recovery email address
                        </DialogContentText>
                        <TextField
                            autoFocus
                            onChange={(e)=>{setEmail(e.target.value)}}
                            value={email}
                            margin='dense'
                            id='name'
                            label='Email Address'
                            type='email'
                            fullWidth
                            error={emailError}
                            helperText = {emailError ? <p>email is incorrect</p> : null}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            type='submit'
                            className={classes.updateButton}
                            variant='contained'
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default ChangePassword;