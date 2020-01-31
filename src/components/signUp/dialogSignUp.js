import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import SignUp from './signUp';
import { useDispatch ,connect } from 'react-redux';
import {openSignUPAction} from '../../actions'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});

const AlertDialogSlideSignUp = (props) => {

    const handleClose = () => {
        dispatch(openSignUPAction())
    };
    const dispatch = useDispatch();

    return (
        <div>
            <Dialog
                ignoreescapekeyup="true"
                title='Dialog'
                open={props.willOpenSignUP}
                TransitionComponent={Transition}
                onClose={handleClose}
            >
                <SignUp handleDialogClose={handleClose}/>
            </Dialog>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        willOpenSignUP: state.willOpenSignUP,
    };
}
export default connect(mapStateToProps)(AlertDialogSlideSignUp)