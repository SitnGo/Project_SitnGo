import React, { useState } from 'react';
import fire from '../../../ConfigFirebase/Fire'
import styles from './style';
import {
        Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle
} from '@material-ui/core';
import SimpleSnackbarSuccess from '../../offerRoute/snackbar/snackbarSuccess';
function ChangePassword() {
    const classes = styles();
    const [isEmailSuccess, setIsEmailSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const handleUpdate = () => {
        fire.auth().sendPasswordResetEmail(fire.auth().currentUser.email).then(() => {
            setIsEmailSuccess(true);
        });
        setOpen(false);
    };
    const clickOpenChangePassword = () => {
        setOpen(true);
        setIsEmailSuccess(false);    
    };
    const handleClose = () => {
        setOpen(false);
    };
        
    return (
        <>
        <Button
                fullWidth
                className={classes.changeButton}
                variant='text'
                onClick={clickOpenChangePassword}
            >
                Change password?
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Reset password</DialogTitle>
                
                    <DialogContent>
                        <DialogContentText>
                            Sent your verification code to Email address?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className={classes.button}
                            variant='contained'
                            onClick={handleUpdate}
                        >
                            Yes
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
            </Dialog>
            {isEmailSuccess ? <SimpleSnackbarSuccess isRouteSuccess={isEmailSuccess} text='Please check your email...'/> : null}
            
        </>
    );
}

export default ChangePassword;