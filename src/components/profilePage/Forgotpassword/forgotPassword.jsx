import React, {useState, useEffect} from 'react';
import fire from '../../../ConfigFirebase/Fire'
import useStyles from './style';
import {
        Button, 
        TextField, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle
    } from '@material-ui/core'; 

function ForgotPassword() {
    const classes = useStyles(); 
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    
    const handleSend = () => {
        if (email === fire.auth().currentUser.email) {
    
            fire.auth().sendPasswordResetEmail(email).then(function() {
                console.log("email", email);
                
            }).catch(function(error) {
                console.log(error);
            });
    
            setEmailError(false); 
            setOpen(false);
            setEmail("");
        } else {
            setEmailError(true);
        }
    }    
        const handleClose = () => {
            setOpen(false);
            setEmail("");
        }

    

    return (
        <div>
            <Button className={classes.confirmButton} variant="outlined" color="primary" onClick={handleClickOpen}>
            Forgot password?
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To get a verification code, first confirm the recovery email address
                </DialogContentText>
                <TextField
                autoFocus                               
                onChange={(e)=>{setEmail(e.target.value)}}
                value={email}
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                error={emailError}
                helperText = {emailError ? <p>email is incorrect</p> : null}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                Cancel
                </Button>
                <Button onClick={handleSend} color="primary">
                Send
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default ForgotPassword;