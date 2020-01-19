import React, {useState} from 'react';
import fire from '../../../ConfigFirebase/Fire'
import {isEdit1} from '../../sign_in/actions/index';
import {Visibility, VisibilityOff} from "@material-ui/icons"
import {InputAdornment, IconButton } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import {
        Button, 
        TextField, 
        Dialog, 
        DialogActions, 
        DialogContent,  
        DialogTitle
    } from '@material-ui/core'; 

function ConfirmPassword(props) {
    let openDialog = useSelector(state => !state.isEdit1);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleClickPasswordSuccessfully = () => {
        fire.auth().signInWithEmailAndPassword(fire.auth().currentUser.email, password)
        .then(() => {
          setPassword('');
          setOpen(false);
        //   dispatch(SignInAction(result, JSON.parse(localStorage.getItem("isLogged"))));
          })
        .catch(error => {
          console.log(error);
          setPasswordError(true);
          
        });
        
    };
    
    const handleClose = () => {
        dispatch(isEdit1());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }
    return (
        <div>
            <Dialog open={openDialog && open} onClose={false} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">Enter password</DialogTitle>
            <form onSubmit={handleSubmit}>
            <DialogContent>
                <TextField
                autoFocus
                onChange={(e)=>{setPassword(e.target.value.trim())}}
                value={password}
                margin="dense"
                id="name"
                maxWidth={300}
                label="Enter password"
                type={showPassword ? "text" : "password"}
                error={passwordError}
                helperText={passwordError ? <p>password is incorrect</p> : null}
                fullWidth

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { showPassword ? setShowPassword(false) : setShowPassword(true) }}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                Cancel
                </Button>
                <Button type="submit" onClick={handleClickPasswordSuccessfully} color="primary">
                Submit
                </Button>
            </DialogActions>
            </form>
            </Dialog>
        </div>
    );
}

export default ConfirmPassword;