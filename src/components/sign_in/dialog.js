import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';

import { ViewModule } from '@material-ui/icons';

//import { makeStyles} from '@material-ui/core/Styles';



// const styles = theme => ({
//     dialog: {
//       width: '80%',
//       maxHeight: 435,
//     },
//   });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const {setUser, setOpen} = props;

  const handleClose = () => {
    // dispatch(openSignIn({}))
    props.setOpenSignInBox(false);
  };
    const openSignIn = useSelector(state => state.openSignIn);
    const dispatch = useDispatch();

  return (
    <div>
      {/* <Button variant="outlined" color="primary" 
      // onClick={handleClickOpen}
      >
        Login
      </Button> */}
      <Dialog
      ignoreEscapeKeyUp
        title="Dialog" 
        modal = {true} 
        maxWidth = "sm"
        autoDetectWindowHeight={true} 
        autoScrollBodyContent={true}
        contentStyle={{width: "80%", maxWidth: "none"}}
        open={props.openSignInBox}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{}</DialogTitle>
        <DialogContent
        maxWidth = "md">
            <Login  setOpenSignInBox={props.setOpenSignInBox} openSignInBox={props.openSignInBox}/>
          {/* <DialogContentText id="alert-dialog-slide-description">
           
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
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

export default AlertDialogSlide;