import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Login from './Login';
import {styles} from './style';

import { useDispatch, connect } from 'react-redux';
import { openSignInAction } from "./actions"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = (props) => {

  const handleClose = () => {
    dispatch(openSignInAction())
  };
  const dispatch = useDispatch();

  return (
    <div>
      <Dialog
        style={styles.signInContainer}
        open={props.willOpenSignIN}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <Login setOpenSignInBox={props.setOpenSignInBox} openSignInBox={props.openSignInBox} />
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