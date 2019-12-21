import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Login from './Login';
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
        open={props.willOpenSignIN}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent
          maxWidth="md">
          <Login setOpenSignInBox={props.setOpenSignInBox} openSignInBox={props.openSignInBox} />
        </DialogContent>
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