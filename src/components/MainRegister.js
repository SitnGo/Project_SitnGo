import React, { useState, useEffect } from 'react';
import { Link, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import firebase from "firebase";
import {Visibility, VisibilityOff, Phone, Email} from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';

 

var firebaseConfig = {
    apiKey: "AIzaSyAEjOCmERrjnQpDEHCMPcfSUGKYs-qPP4I",
    authDomain: "sitngo-8a880.firebaseapp.com",
    databaseURL: "https://sitngo-8a880.firebaseio.com",
    projectId: "sitngo-8a880",
    storageBucket: "sitngo-8a880.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",


};


firebase.initializeApp(firebaseConfig)
// const db = firebase.firestore()

// db.collection("users").get().then((querySnapshot) => {
//     // console.log(querySnapshot.docs[0].data())
// });
let PasswordValidator = require('password-validator');
export default function MainRegister() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState("false");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword,setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        passwordError: { bool: false, errText: "" },
        emailError: false,
    })

    useEffect(() => {
        confirmPassword === password ? setHasConfirmPasswordError(false) : setHasConfirmPasswordError(true)
    }, [confirmPassword])

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

        if ((arrFromErrorsValues.every(item => item === false) && !hasConfirmPasswordError)) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(function (error) {
                    let err = Object.assign({}, errors);
                    setErrors(Object.assign(err, { emailError: true }))
                });
        }
    }), [errors])

    function checkErrorsHandler() {
        let text = [];
        let err = Object.assign({}, errors);
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
                        text.push("Min length is 8");
                        break;
                    case "digits":
                        text.push("Need at least 1 digit");
                        break;
                    case "uppercase":
                        text.push("Need at least 1 Uppercase letter");
                        break;
                    case "lowercase":
                        text.push("Need at least 1 Lowercase letter");
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



    }



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh", width: "100%", }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",padding: "20px 0 20px 0", width: "50%"}}>
                <Typography variant="h2" component="h2" margin="normal">
                    Sign up with email
                </Typography>
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
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            <Email/>
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
                            onClick={()=>{ showPassword ? setShowPassword(false) : setShowPassword(true)}}
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
                            onClick={()=>{ showPassword ? setShowPassword(false) : setShowPassword(true)}}
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
                    // error={errors.emailError}
                    // helperText={errors.emailError ? "Email is not valid" : null}
                    color="primary"
                    variant="outlined"
                    label="Phone"
                    onChange={(e) => { setPhone(e.target.value) }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            <Phone/>
                          </IconButton>
                        </InputAdornment>
                        )
                    }}
                />
                <RadioGroup row aria-label="gender" name="gender1" onChange={(e) => { setGender(e.target.value) }}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={checkErrorsHandler}>Submit</Button>
                    <Typography variant="body2" component="h1" display="block" align="left" lineHeight={10}>
                    Already a member?<Link href="#"> Log in</Link>
                    </Typography>
                    <Typography variant="body2" component="h1" display="block" align="justify">
                    By continuing, you accept our T&Cs and Privacy Policy. This information is collected by COMUTO SA for the purposes of creating your account,
                    managing your booking, use and improve our services and ensuring the security of our platform.
                    You have rights on your personal data and can exercise them by contacting SitnGo through our contact form or by email under <Link href="#">Sitngo.am@gmail.com</Link>.
                    You can learn more about your rights and how we handle your personal data in our <Link href="#">Privacy Policy</Link>.
                    </Typography>
            </div>
        </div>
    )
}