import React, {useState} from 'react';
import {Button, Fab} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import {Close } from "@material-ui/icons";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fire from '../../ConfigFirebase/Fire';
import { styles } from './style';


export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isAnError, setIsAnError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setErrorMessage("");
  };
  const forgotPassword = () => {
    
    fire.auth().sendPasswordResetEmail(email)
      .then(function (u) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e);
        console.log(email);
        setIsAnError(true);
        setErrorMessage(e.message)        
      })
  } ;

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Forgot your password ?
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Password recovery</DialogTitle>
        <DialogContent>
          <DialogContentText>
          To get a verification code, <br/>
          first confirm the recovery email address
          </DialogContentText>
          <TextField
            autoFocus
            required
            style={{ width: "100%" }}
            helperText ={(isAnError === true) ? <div style={{ fontSize: 10, color: "red" }}>{errorMessage}</div> : null}
            autofocus
            name = "email"
            value={email}
            margin = "dense"
            color = "primary"
            variant = "outlined"
            label = "Enter recovery email address"
            onChange={e => {setEmail(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={forgotPassword} color="primary">
            Send 
          </Button>
          <Fab onClick={handleClose} 
          position = "absolute"
          color="primary"
        size="small"
        style={styles.close}><Close/></Fab>
        </DialogActions>
      </Dialog>
    </div>
  );
}