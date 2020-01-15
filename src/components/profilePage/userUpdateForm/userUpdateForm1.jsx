import React,{useState} from 'react';
import useStyles from './style';
import {Grid, TextField, Button} from '@material-ui/core';
import { Visibility, VisibilityOff, Phone, Email} from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import fire from '../../../ConfigFirebase/Fire';
import { useSelector } from 'react-redux';
function UpdateForm (props) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(props.data[0]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState(props.data[1]);
    const [errors, setErrors] = useState({
        passwordError: { bool: false, errText: "" },
        emailError: { bool: false, errText: "" },
        nameError: { bool: false, errText: "" },
        surnameError: { bool: false, errText: "" },
        genderError: false,
        phoneError: false,
    });
    fire.firestore().collection("users").doc(props.userId).update({phone: "077897"});


//     function checkErrorsHandler() {
//         let text = null;
//         let err = Object.assign({}, errors);
// /////////////////////////////////////////////////email/////////////////////////////////
//         let validator = require("email-validator");
//         if (!validator.validate(email)) {
//             setErrors(Object.assign(err, { emailError: {bool: true, errText: "Email is not valid or already in use"} }))
//         } else {
//             setErrors(Object.assign(err, { emailError: false }))
//         }
//     }    
    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.updateBlock}>
            <TextField  className={classes.textfield} 
            label="email" 
            variant="filled"
            onChange={(e) => {setEmail(e.target.value)}}
            value={email}
            // helperText={errors.emailError ? errors.emailError.errText : null}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                            <Email/>
                    </InputAdornment>
                )
            }}
            
            />
            <TextField  className={classes.textfield} type={showPassword ? "text" : "password"} label="password" variant="filled" 
                        onChange={(e) => {setPassword(e.target.value)}}          
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
            <TextField  className={classes.textfield} type={showPassword ? "text" : "password"} label="confirm password" variant="filled"  onChange={(e) => {setConfirmPassword(e.target.value)}}
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
            <TextField  className={classes.textfield} label="phone" variant="filled" onChange={(e) => {setPhone(e.target.value)}}
            value={phone}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">                    
                            <Phone />
                   </InputAdornment>
                )
            }}
            
            />
            <Button variant="contained" color="primary">Update</Button>
        </Grid>
        
    );
}

export default UpdateForm;