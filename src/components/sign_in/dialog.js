import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Login from './Login';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const {setUser, setOpen} = props;
  // let gago='2'

  //const {setEmail, setErrorMessage, setPassword} = props;

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" 
      // onClick={handleClickOpen}
      >
        Login
      </Button> */}
      <Dialog 
        title="Dialog" 
        modal = {true} 
        maxWidth = "sm"
        autoDetectWindowHeight={true} 
        autoScrollBodyContent={true}
        contentStyle={{width: "80%", maxWidth: "none"}}
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{}</DialogTitle>
        <DialogContent 
        maxWidth = "md">
            <Login  setOpen={setOpen} setUser={setUser}/>
          {/* <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText> */}
        </DialogContent>
        <DialogActions >
          {/* <Button onClick={handleClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlide;