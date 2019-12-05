import React, { useState, useEffect } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import firebase from "firebase";
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
let PasswordValidator = require('password-validator');

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

db.collection("users").get().then((querySnapshot) => {
    // console.log(querySnapshot.docs[0].data())
});
export default function MainRegister() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState("false");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
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
        console.log(arrFromErrorsValues, (arrFromErrorsValues.every(item => item === false)))
        console.log(hasConfirmPasswordError)
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <TextField
                margin="dense"
                error={errors.emailError}
                helperText={errors.emailError ? "Email is not valid or already is in use" : null}
                color="primary"
                variant="standard"
                label="Email"
                onChange={(e) => { setEmail(e.target.value) }}
            />
            <TextField
                margin="dense"
                error={errors.passwordError.bool}
                helperText={errors.passwordError.bool ? errors.passwordError.errText.map((element, i) => {

                    return (<p key={i}> {element}</p>)

                }) : null}
                color="primary"
                variant="standard"
                label="Password"
                onChange={(e) => { setPassword(e.target.value) }}

            />
            <TextField
                margin="dense"
                error={hasConfirmPasswordError}
                helperText={hasConfirmPasswordError ? "Confirm password do not match" : null}
                color="primary"
                variant="standard"
                label="Confirm Password"
                onChange={(e) => { setConfirmPassword(e.target.value) }}
            />

            <TextField
                margin="dense"
                // error={errors.emailError}
                // helperText={errors.emailError ? "Email is not valid" : null}
                color="primary"
                variant="standard"
                label="Phone"
                onChange={(e) => { setPhone(e.target.value) }}
            />
            <RadioGroup aria-label="gender" name="gender1" onChange={(e) => { setGender(e.target.value) }}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
            <Button
                color="primary"
                variant="outlined"
                onClick={checkErrorsHandler}>Submit</Button>
        </div>
    )
}