import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import SignIn from './signIn';
import { useDispatch, connect } from 'react-redux';
import { openSignInAction } from '../../actions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});
function mapStateToProps(state) {
    return {
        willOpenSignIN: state.willOpenSignIN,
    };
}
const AlertDialogSlide = (props) => {
    const handleClose = () => {
        dispatch(openSignInAction())
    };
    const dispatch = useDispatch();

    return (
        <div>
            <Dialog
                ignoreescapekeyup="true"
                title='Dialog'
                open={props.willOpenSignIN}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <SignIn setOpenSignInBox={props.setOpenSignInBox} openSignInBox={props.openSignInBox} />
            </Dialog>
        </div>
    );
}

export default connect(mapStateToProps)(AlertDialogSlide)