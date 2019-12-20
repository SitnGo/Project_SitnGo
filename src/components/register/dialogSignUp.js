import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import SignUp from './register';
import { useSelector, useDispatch } from 'react-redux';

import { ViewModule } from '@material-ui/icons';

//import { makeStyles} from '@material-ui/core/Styles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlideSignUp = (props) => {


  const handleClose = () => {
    // dispatch(openSignIn({}))
    props.setOpenSignUPBox(false);
  };
    const openSignIn = useSelector(state => state.openSignIn);
    const dispatch = useDispatch();

  return (
    <div>
      <Dialog
      ignoreEscapeKeyUp
        title="Dialog" 
        open={props.openSignUPBox}
        TransitionComponent={Transition}
        onClose={handleClose}
        >
            <SignUp  setOpenSignUPBox={props.setOpenSignUPBox}/>
      </Dialog>
    </div>
  );
}

export default AlertDialogSlideSignUp;