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
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState("");
    const handleClickOpen = () => {
        
        setOpen(true);
    
    };
    
    const handleClose = () => {
             
        fire.auth().sendPasswordResetEmail(email).then(function() {
        
            console.log("email", email);
        
        }).catch(function(error) {

            console.log(error);
        });

        setOpen(false);

    };

    return (
        <div>
            <Button className={classes.confirmButton} variant="outlined" color="primary" onClick={handleClickOpen}>
            Forgot password?
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                Send
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default ForgotPassword;