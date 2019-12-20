<<<<<<< HEAD
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
=======
import React from 'react';
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Login from './Login';
<<<<<<< HEAD

=======
import { useDispatch, connect } from 'react-redux';
import { openSignInAction } from "./actions"
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
<<<<<<< HEAD
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const {setUser, setOpen} = props;
  // let gago='2'

  //const {setEmail, setErrorMessage, setPassword} = props;
=======
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57

  const handleClose = () => {
    dispatch(openSignInAction())
  };
  const dispatch = useDispatch();

  return (
    <div>
<<<<<<< HEAD
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
=======
      <Dialog
        open={props.willOpenSignIN}
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57
        TransitionComponent={Transition}
        onClose={handleClose}
      >
<<<<<<< HEAD
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
=======
        <DialogContent
          maxWidth="md">
          <Login setOpenSignInBox={props.setOpenSignInBox} openSignInBox={props.openSignInBox} />
        </DialogContent>
>>>>>>> e99c361df82326772435ba1a6f3ef3cb2d925c57
      </Dialog>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    willOpenSignIN: state.willOpenSignIN,
  };
}
export default connect(mapStateToProps)(AlertDialogSlide)