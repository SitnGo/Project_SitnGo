import React, {useState, useEffect} from 'react';
import fire from '../../../ConfigFirebase/Fire'
import {isEdit1, openUpdateForm} from '../../../actions/index';
import {Visibility, VisibilityOff, CodeSharp} from '@material-ui/icons'
import {InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

function ConfirmPassword() {
    let openDialog = useSelector(state => !state.isEdit1);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

            const handleClickPasswordSuccessfully = () => {
                fire.auth().signInWithEmailAndPassword(fire.auth().currentUser.email, password)
                    .then(() => {
                        dispatch(openUpdateForm());
                        setPassword('');
                        setOpen(false);
                    })
                    .catch(error => {
                        console.log(error);
                        setPasswordError(true);
                        setShowLoader(false);
                    });
            };

 
    const handleClose = () => {
        dispatch(isEdit1());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoader(true);
    }
    return (
        <div>
            <Dialog open={openDialog && open}  aria-labelledby='form-dialog-title' fullWidth={true}>
                <DialogTitle id='form-dialog-title'>Enter password</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            onChange={(e)=>{setPassword(e.target.value.trim())}}
                            value={password}
                            margin='dense'
                            id='name'
                            maxwidth={300}
                            label='Enter password'
                            type={showPassword ? 'text' : 'password'}
                            error={passwordError}
                            helperText={passwordError ? 'password is incorrect' : null}
                            fullWidth

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={() => { showPassword ? setShowPassword(false) : setShowPassword(true) }}
                                            edge='end'
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color='secondary'>
                            Cancel
                        </Button>
                       { showLoader  ? <CircularProgress />:<Button type='submit' onClick={handleClickPasswordSuccessfully} color='primary'>
                            Submit
                        </Button> }
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default ConfirmPassword;