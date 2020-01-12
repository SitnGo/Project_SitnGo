import React, { useState, useEffect } from 'react';
import { classes } from './style';
import { Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { Visibility, VisibilityOff, Phone, Email, AccountBox } from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import fire from '../../ConfigFirebase/Fire';
import { openSignUPAction, loggedAction } from "../sign_in/actions"
import { useDispatch, connect } from 'react-redux';

let PasswordValidator = require('password-validator');

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState("false");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        passwordError: { bool: false, errText: "" },
        emailError: false,
        nameError: { bool: false, errText: "" },
        surnameError: { bool: false, errText: "" },
        genderError: false,
    });
    useEffect(() => {
        confirmPassword === password ? setHasConfirmPasswordError(false) : setHasConfirmPasswordError(true)
    }, [confirmPassword, password])

    useEffect((() => {
        //////////////////////get all errors in array/////////////////////////////////////
        let arrFromErrorsValues = Object.values(errors)
        arrFromErrorsValues = arrFromErrorsValues.map(item => {
            if (item.hasOwnProperty("bool")) {
                return item.bool;
            } else {
                return item;
            }
        })
        //////////////////check errors/////////////////////

        if (((arrFromErrorsValues.every(item => item === false) && !hasConfirmPasswordError))) {
            let userId;
            fire.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    fire.auth().signInWithEmailAndPassword(email, password)
                })
                .then(() => {
                    userId = fire.auth().currentUser.uid;
                })
                .then(() => {
                    fire.firestore().collection("users").doc(userId).set({
                        name: name,
                        surname: surname,
                        email: email,
                        gender: gender,
                        phone: phone,
                    });
                }).then(() => {
                    dispatch(openSignUPAction());
                    dispatch(loggedAction());
                })
                .catch(function (error) {
                    console.log(error)
                    let err = Object.assign({}, errors);
                    setErrors(Object.assign(err, { emailError: true }))
                });
        }
    }), [errors])
  
    function checkErrorsHandler() {
        let text = null;
        let textInputName = null;
        let textInputSurname = null;
        let err = Object.assign({}, errors);
        ////////////////////////name surname gender/////////////
        let inputValidator = new PasswordValidator();
        inputValidator
            .has().not().spaces()
            .has().not().digits()
            .is().min(2)
            .is().max(10)
        if (!inputValidator.validate(name)) {
            let failedListName = inputValidator.validate(name, { list: true });
            for (let i = 0; i < failedListName.length; i++) {
                switch (failedListName[i]) {
                    case "min":
                        textInputName = ["Min length is 2"];
                        break;
                    case "digits":
                        textInputName = ["Can't contain digits"];
                        break;
                    case "spaces":
                        textInputName = ["Can't contain spaces"];
                        break;
                }
            }
            setErrors(Object.assign(err, { nameError: { bool: true, errText: textInputName } }))
        } else {
            setErrors(Object.assign(err, { nameError: { bool: false, errText: textInputName } }))
        }
        if (!inputValidator.validate(surname)) {
            let failedListSurname = inputValidator.validate(surname, { list: true });
            for (let i = 0; i < failedListSurname.length; i++) {
                switch (failedListSurname[i]) {
                    case "min":
                        textInputSurname = ["Min length is 2"];
                        break;
                    case "digits":
                        textInputSurname = ["Can't contain digits"];
                        break;
                    case "spaces":
                        textInputSurname = ["Can't contain spaces"];
                        break;
                }
            }
            setErrors(Object.assign(err, { surnameError: { bool: true, errText: textInputSurname } }))
        } else {
            setErrors(Object.assign(err, { surnameError: { bool: false, errText: null } }))
        }
        if (gender) {
            setErrors(Object.assign(err, { genderError: false }))
        } else {
            setErrors(Object.assign(err, { genderError: true }))
        }


        /////////////////////password////////////////////
        let passwordValidator = new PasswordValidator();
        passwordValidator
            .is().min(8)                                       // Minimum length 8
            .is().max(100)                                  // Maximum length 100
            .has().uppercase()                           // Must have uppercase letters
            .has().lowercase()                            // Must have lowercase letters
            .has().digits()                                    // Must have digits
            .has().not().spaces()
        if (!passwordValidator.validate(password)) {
            let failedList = passwordValidator.validate(password, { list: true });
            for (let i = 0; i < failedList.length; i++) {
                switch (failedList[i]) {
                    case "min":
                        text = ["Min length is 8"];
                        break;
                    case "digits":
                        text = ["Need at least 1 digit"];
                        break;
                    case "uppercase":
                        text = ["Need at least 1 Uppercase letter"];
                        break;
                    case "lowercase":
                        text = ["Need at least 1 Lowercase letter"];
                        break;
                }
            }

            setErrors(Object.assign(err, { passwordError: { bool: true, errText: text } }))
        } else {
            setErrors(Object.assign(err, { passwordError: { bool: false, errText: null } }))
        }
        /////////////////////////////////////////////////email/////////////////////////////////
        let validator = require("email-validator");
        if (!validator.validate(email)) {
            setErrors(Object.assign(err, { emailError: true }))
        } else {
            setErrors(Object.assign(err, { emailError: false }))
        }

        ////////////////////////phone number/////////////////
        switch (phone.length) {
            case 9:
                if (
                    `${phone[0]}${phone[1]}${phone[2]}` === "010" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "011" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "041" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "055" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "077" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "091" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "093" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "094" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "095" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "098"
                ) {
                    setErrors(Object.assign(err, { phoneError: false }))
                }
                break;
            case 12:
                if (
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37410" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37411" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37441" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37455" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37477" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37491" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37493" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37494" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37495" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37498"
                ) {
                    setErrors(Object.assign(err, { phoneError: false }))
                    break;
                }
            default:
                setErrors(Object.assign(err, { phoneError: true }))
                break;
        }
    }

    return (
        <div>
            <div style={props.changeSignUpStyle ? classes.signUpContainer : classes.changeSignUpContainer} >
               {
               props.changeSignUpStyle ? 
               (<Typography
                    variant="h3"
                    component="h3"
                    margin="normal"
               >Sign up</Typography>) : 
               null
               }
                <TextField 
                    autoFocus
                    margin="dense"
                    error={errors.nameError.bool}
                    helperText={errors.nameError.errText}
                    color="primary"
                    variant="outlined"
                    label="Name"
                    onChange={(e) => { setName(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle"
                                    edge="end"
                                >
                                    <AccountBox />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="dense"
                    error={errors.surnameError.bool}
                    helperText={errors.surnameError.errText}
                    color="primary"
                    variant="outlined"
                    label="Surname"
                    onChange={(e) => { setSurname(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle"
                                    edge="end"
                                >
                                    <AccountBox />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="dense"
                    error={errors.emailError}
                    helperText={errors.emailError ? "Email is not valid or already is in use" : null}
                    color="primary"
                    variant="outlined"
                    label="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle"
                                    edge="end"
                                >
                                    <Email />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin="dense"
                    type={showPassword ? "text" : "password"}
                    error={errors.passwordError.bool}
                    helperText={errors.passwordError.bool ? errors.passwordError.errText.map((element, i) => {
                        return (<p key={i}> {element}</p>)
                    }) : null}
                    color="primary"
                    variant="outlined"
                    label="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
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
                <TextField
                    margin="dense"
                    type={showPassword ? "text" : "password"}
                    error={hasConfirmPasswordError}
                    helperText={hasConfirmPasswordError ? "Confirm password do not match" : null}
                    color="primary"
                    variant="outlined"
                    label="Confirm Password"
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
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
                <TextField
                    margin="dense"
                    error={errors.phoneError}
                    helperText={errors.phoneError ? "Phone number is not valid" : null}
                    color="primary"
                    variant="outlined"
                    label="Phone"
                    onChange={(e) => { setPhone(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle"
                                    edge="end"
                                >
                                    <Phone />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                {/* {props.changeSignUpStyle ? <> */}
                <div style={errors.genderError ? {border: "1px solid red", borderRadius: "5px", marginBottom: 2} : {border: "none"}}>
                <RadioGroup error row aria-label="gender" name="gender1" onChange={(e) => { setGender(e.target.value) }}>
                    <FormControlLabel value="male" control={<Radio style={classes.radio} />} label="Male" />
                    <FormControlLabel value="female" control={<Radio style={classes.radio} />} label="Female" />
                </RadioGroup>
                </div>
                {/* </> : null */}
                {/* } */}
                <Button
                    fullWidth
                    style={props.changeSignUpStyle ?  classes.signUpButton : classes.changeSignUpButton}
                    variant="contained"
                    onClick={checkErrorsHandler}
                >Submit</Button>
                {props.changeSignUpStyle ? <>
                <Button
                    fullWidth
                    style={classes.cancelButton}
                    variant="outlined"
                    onClick={() => dispatch(openSignUPAction())}
                >Cancel</Button>
                </> : null
                }

            </div>
        </div>
    );
}


function mapStateToProps(state) {
    return {
        willOpenSignUP: state.willOpenSignUP,
        isLoggedInUser: state.isLoggedInUser,
    };
}
export default connect(mapStateToProps)(SignUp)