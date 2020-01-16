import React,{useState, useEffect} from 'react';
import useStyles from './style';
import {Grid, TextField, Button} from '@material-ui/core';
import { Visibility, VisibilityOff, Phone, Email} from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import fire from '../../../ConfigFirebase/Fire';
import { useSelector } from 'react-redux';


let PasswordValidator = require('password-validator');

function UpdateForm (props) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState(props.data[0]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState("false");
    const [phone, setPhone] = useState(props.data[1]);
    const [errors, setErrors] = useState({
        passwordError: { bool: false, errText: "" },
        emailError: { bool: false, errText: "" },
        nameError: { bool: false, errText: "" },
        surnameError: { bool: false, errText: "" },
        genderError: false,
        phoneError: false,
    });
    useEffect(() => {
        confirmPassword === password ? setHasConfirmPasswordError(false) : setHasConfirmPasswordError(true)
    }, [confirmPassword])

//////////////////////get all errors in array/////////////////////////////////////
    let arrFromErrorsValues = Object.values(errors)
    arrFromErrorsValues = arrFromErrorsValues.map(item => {
        if (item.hasOwnProperty("bool")) {
            return item.bool;
        } else {
            return item;
        }
    })

    // fire.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //         alert(user);
    //     //   user.updateEmail(doc.data().userInfo.email).then(()=>{
    //     //         console.log(user.email);
    //     //     })
    //     } else {
        
    //       // No user is signed in.
    //     }
    // });
     //////////////////check errors/////////////////////
    fire.firestore().collection("users").doc(props.userId).get().then((doc)=>{
        // console.log(fire.auth().currentUser);
        // fire.auth().onAuthStateChanged((user)=>{
        //     console.log(user);
        // })
        // fire.auth().currentUser.updateEmail("asd11@mail.ru").then(()=> {console.log("AWD")}).catch((e)=>{console.log(e)});

       
        fire.firestore().collection("users").doc(props.userId).update({
            userInfo: {
                // name:doc.data().userInfo.name,
                surname: doc.data().userInfo.surname,
                email: email,
                gender: doc.data().userInfo.gender,
                phone: phone,
            }
        
        });
    });
    

    //  if ((arrFromErrorsValues.every(item => item === false) && !hasConfirmPasswordError)) {
        // console.log(fire.auth().currentUser);
     fire.firestore().collection("users").doc(props.userId).get().then((doc)=>{
        // fire.auth().currentUser.updateEmail("asd111@mail.ru").then(()=> {console.log("AWD")}).catch((e)=>{console.log(e)});
        fire.firestore().collection("users").doc(props.userId).update({
            userInfo: {
                // name:doc.data().userInfo.name,
                surname: doc.data().userInfo.surname,
                email: email,
                gender: doc.data().userInfo.gender,
                phone: phone,
            }
        
        });
    });
    //  }

    function checkErrorsHandler() {
        let text = null;
        let err = Object.assign({}, errors);


//////////////////////password/////////////////////////////////////////

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
            if(password.trim() !== "") {
                setErrors(Object.assign(err, { passwordError: { bool: true, errText: text } }))
            }
            
        } else {
            setErrors(Object.assign(err, { passwordError: { bool: false, errText: null } }))
        }

/////////////////////////////////////////////////email/////////////////////////////////
        let validator = require("email-validator");
        if (!validator.validate(email)) {
            setErrors(Object.assign(err, { emailError: {bool: true, errText: "Email is not valid or already in use"} }))
        } else {
            setErrors(Object.assign(err, { emailError: false }))
        }

        ////////phone///////////////////////////////////
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
                    `${phone[0]}${phone[1]}${phone[2]}` === "096" ||
                    `${phone[0]}${phone[1]}${phone[2]}` === "098"
                ) {
                    setErrors(Object.assign(err, { phoneError: false }))
                    break;
                }else{
                    setErrors(Object.assign(err, { phoneError: true }))
                    break;
                }
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
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37496" ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === "+37498"
                ) {
                    setErrors(Object.assign(err, { phoneError: false }))
                    break;
                }else{
                    setErrors(Object.assign(err, { phoneError: true }))
                    break;
                }
                
            default:
                setErrors(Object.assign(err, { phoneError: true }))
                break;
        }
    }    
    return (
        <Grid container direction="column" justify="center" alignItems="center" className={classes.updateBlock}>
            <TextField  className={classes.textfield} 
            label="email" 
            variant="filled"
            onChange={(e) => {setEmail(e.target.value)}}
            value={email}
            error={errors.emailError.bool}
            helperText={errors.emailError ? errors.emailError.errText : null}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                            <Email/>
                    </InputAdornment>
                )
            }}
            
            />
            <TextField  className={classes.textfield}
            type={showPassword ? "text" : "password"}
            label="password" 
            variant="filled" 
            onChange={(e) => {setPassword(e.target.value)}} 
            error={errors.passwordError.bool}
            helperText={errors.passwordError.bool ? errors.passwordError.errText.map((element, i) => {
                    return (<p key={i}> {element}</p>)
                }) : null}         
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
            <TextField  className={classes.textfield}
            type={showPassword ? "text" : "password"}
            label="confirm password" 
            variant="filled" 
            onChange={(e) => {setConfirmPassword(e.target.value)}}
            error={hasConfirmPasswordError}
            helperText={hasConfirmPasswordError ? "Confirm password do not match" : null}
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
            <TextField  className={classes.textfield}
            label="phone"
            variant="filled"
            onChange={(e) => {setPhone(e.target.value)}}
            value={phone}
            error={errors.phoneError}
            helperText={errors.phoneError ? "Phone number is not valid" : null}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">                    
                            <Phone />
                   </InputAdornment>
                )
            }}
            
            />
            <Button variant="contained" color="primary" onClick={checkErrorsHandler}>Update</Button>
        </Grid>
        
    );
}

export default UpdateForm;