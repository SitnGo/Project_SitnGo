import React, { useState, useEffect } from 'react';
import { Link, Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import firebase from "firebase";
import { Visibility, VisibilityOff, Phone, Email, AccountBox } from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import AlertDialogSlide from "./LoginSlide/LoginSlide"
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
        phoneError: false,
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

        ////////////////////////phone number/////////////////
            switch (phone.length) {
                case 9:
                    if( 
                        `${phone[0]}${phone[1]}${phone[2]}`==="010"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="011"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="041"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="055"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="077"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="091"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="093"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="094"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="095"||
                        `${phone[0]}${phone[1]}${phone[2]}`==="098"
                        ){
                        setErrors(Object.assign(err, { phoneError: false }))  
                    }
                    break;
                case 12:
                    if(
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37410"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37411"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37441"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37455"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37477"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37491"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37493"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37494"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37495"||
                        `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}`==="+37498"
                    ){
                        setErrors(Object.assign(err, { phoneError: false }))
                        break;
                    }
                default:
                        setErrors(Object.assign(err, { phoneError: true }))
                    break;
            }




    }



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100vh", width: "100%", }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", padding: "20px 0 20px 0", width: "50%" }}>
                <Typography variant="h2" component="h2" margin="normal">
                    Sign up with email
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
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
                <input style={{display:"none"}}
                    accept="image/*"
                    // className={classes.input}
                    id="contained-button-file"
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" color="primary" fullWidth>
                        Upload Photo
                     </Button>
                </label>
                <RadioGroup row aria-label="gender" name="gender1" onChange={(e) => { setGender(e.target.value) }}>
                    <FormControlLabel  value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                </RadioGroup>
                <Button
                fullWidth
                    color="primary"
                    variant="contained"
                    onClick={checkErrorsHandler}>Submit</Button>
                    <div style={{margin: "20px 0"}}>
                <Typography variant="body2" component="h1" display="block" align="left" lineHeight={10}>
                    Already a member?<Link href="#"> Log in</Link>
                </Typography>
                </div>
                <Typography variant="body2" component="h1" display="block" align="justify">
                    By continuing, you accept our T&Cs and Privacy Policy. This information is collected by COMUTO SA for the purposes of creating your account,
                    managing your booking, use and improve our services and ensuring the security of our platform.
                    You have rights on your personal data and can exercise them by contacting SitnGo through our contact form or by email under <Link href="#">Sitngo.am@gmail.com</Link>.
                    You can learn more about your rights and how we handle your personal data in our <Link href="#">Privacy Policy</Link>.
                    </Typography>

                    <AlertDialogSlide/>
            </div>
        </div>
    )
}