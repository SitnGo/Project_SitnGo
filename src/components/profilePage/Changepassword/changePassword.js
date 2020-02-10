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
function ChangePassword(props) {
    const classes = styles();
    const [isEmailSuccess,setIsEmailSuccess] = useState(false);
    const handleUpdate = () => {
        fire.auth().sendPasswordResetEmail(fire.auth().currentUser.email).then(() => {
            setIsEmailSuccess(true);
        });
        props.setOpen(false);
    };
    const handleClose = () => {
        props.setOpen(false);
    };
        
    return (
        <>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Reset password</DialogTitle>
                
                    <DialogContent>
                        <DialogContentText>
                            Sent your verification code to Email address?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className={classes.updateButton}
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