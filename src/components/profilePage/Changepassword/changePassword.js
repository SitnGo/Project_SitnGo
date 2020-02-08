import React from 'react';
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

function ChangePassword(props) {
    const classes = styles();

    const handleUpdate = () => {
        fire.auth().sendPasswordResetEmail(fire.auth().currentUser.email).then(() => {
            alert('Please check your email...');
        }).catch(() => {
            alert('An Error occurred');
        })
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
        </>
    );
}

export default ChangePassword;