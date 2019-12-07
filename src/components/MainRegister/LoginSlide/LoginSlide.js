import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Login from "./Log in/Login"
import { TextField, InputAdornment, IconButton,  } from '@material-ui/core';
import {Visibility, VisibilityOff, Email} from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        // keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
        <TextField
        margin = "dense"
       color = "primary"
       variant = "outlined"
       label = "Email"
    //    onChange={this.handleChange} 
       InputProps= {{
        endAdornment:(
           <InputAdornment position = "end">
             <IconButton 
             aria-lebel = "toggle"
             edge= "end"
             >
               <Email/>
             </IconButton>
           </InputAdornment>
         )
       }}
       />
             <TextField
      margin="dense"
      type={showPassword ? "text" : "password"}
      color="primary"
      variant="outlined"
      label="Password"
    //   onChange={this.handleChange}
      InputProps={{
      endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={()=>{ showPassword ? setShowPassword(false) : setShowPassword( true)}}
              edge="end"
            >
          {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
          )
          }}
      />
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
