import React, {useState} from 'react';
import fire from '../../../ConfigFirebase/Fire'
import styles from './style';
import {Visibility, VisibilityOff} from '@material-ui/icons'
import {InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

function ConfirmPassword(props) {
    const [showLoader, setShowLoader] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const classes = styles();
 
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowLoader(true);
       
        fire.auth().signInWithEmailAndPassword(fire.auth().currentUser.email, password)
            .then(() => {
                props.setOpenUpdateForm(true);
            })
            .catch(error => {
                console.log(error);
                setPasswordError(true);
                setShowLoader(false);
            });
    }

    const handleClose = () => {
        props.setIsEdit(true);
    };

    return (
        <div>
            <Dialog open={!props.isEdit}  aria-labelledby='form-dialog-title' fullWidth={true}>
                <DialogTitle id='form-dialog-title'>Enter password</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            onChange={(e)=>{setPassword(e.target.value)}}
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
                       { 
                        showLoader  ? 
                            <CircularProgress />
                       :
                            <Button 
                                type='submit' 
                                className={classes.submit}
                                variant='contained' 
                            >
                                Submit
                            </Button> 
                        }
                        <Button 
                            variant='outlined' 
                            onClick={handleClose}
                            disabled={showLoader ? true : false}
                            >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default ConfirmPassword;