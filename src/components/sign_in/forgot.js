import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import fire from '../../ConfigFirebase/Fire';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const forgotPassword = () => {
    //   email = email.toString();
    fire.auth().sendPasswordResetEmail(email)
      .then(function (u) {
        alert('Please check your email...')
      }).catch(function (e) {
        console.log(e)
        console.log(email)
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
           Please rewrite your email here 
          </DialogContentText>
          <TextField
            autoFocus
            required
            name = "email"
            value={email}
            margin = "dense"
            color = "primary"
            variant = "outlined"
            label = "Email"
            onChange={e => {setEmail(e.target.value); console.log(email)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={forgotPassword} color="primary">
            Send code 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}