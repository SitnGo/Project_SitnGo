import React, { useState, useEffect } from 'react';
import { classes } from './style';
import { Typography, TextField, Button, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Visibility, VisibilityOff, Phone, Email, AccountBox } from '@material-ui/icons'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import fire from '../../ConfigFirebase/Fire';
import { openSignUPAction } from '../../actions'
import { useDispatch, connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'

let PasswordValidator = require('password-validator');

const SignUp = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasConfirmPasswordError, setHasConfirmPasswordError] = useState(false);
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({
        passwordError: { bool: false, errText: '' },
        emailError: { bool: false, errText: '' },
        nameError: { bool: false, errText: '' },
        surnameError: { bool: false, errText: '' },
        genderError: false,
        phoneError: false,
    });
    useEffect(() => {
        confirmPassword === password ? setHasConfirmPasswordError(false) : setHasConfirmPasswordError(true)
    }, [confirmPassword])

    // useEffect((
        function ifNoErrorsRegisterUser(){
            fire.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    fire.auth().signInWithEmailAndPassword(email, password)
                })
                .then(() => {
                    let userId = fire.auth().currentUser.uid;
                    return userId
                })
                .then((userId) => {
                    let userInfo = {
                            name: name,
                            surname: surname,
                            email: email.toLowerCase(),
                            gender: gender,
                            phone: phone,
                            url: "",
                        }
                    fire.firestore().collection('users').doc(userId).set(userInfo);
                    fire.firestore().collection('users').doc(userId).collection("userRoutesInfo").doc(userId)
                    fire.firestore().collection('users').doc(userId).collection("userAcceptedRoutes").doc(userId)
            }).then((result)=>{
                dispatch(openSignUPAction());
                return result
            })
                .catch(function (error) {
                    let err = Object.assign({}, errors);
                    console.log(error)
                    setErrors(Object.assign(err, { emailError: {bool: true, errText: 'Email is not valid or already in use'} }))

                });
    }

    function checkErrorsHandler() {
        let text = null;
        let textInputName = null;
        let textInputSurname = null;
        let err = Object.assign({}, errors);
        let inputValidator = new PasswordValidator();
        inputValidator
            .has().not().spaces()
            .has().not().digits()
            .is().min(2)
            .is().max(50)
        if (!inputValidator.validate(name)) {
            let failedListName = inputValidator.validate(name, { list: true });
            for (let i = 0; i < failedListName.length; i++) {
                switch (failedListName[i]) {
                    case 'min':
                        textInputName = ['Min length is 2'];
                        break;
                    case 'digits':
                        textInputName = ['Can\'t contain digits'];
                        break;
                    case 'spaces':
                        textInputName = ['Can\'t contain spaces'];
                        break;
                    default: break;
                }
            }
            setErrors(Object.assign(err, { nameError: { bool: true, errText: textInputName } }))
            return
        } else {
            setErrors(Object.assign(err, { nameError: { bool: false, errText: textInputName } }))
        }
        if (!inputValidator.validate(surname)) {
            let failedListSurname = inputValidator.validate(surname, { list: true });
            for (let i = 0; i < failedListSurname.length; i++) {
                switch (failedListSurname[i]) {
                    case 'min':
                        textInputSurname = ['Min length is 2'];
                        break;
                    case 'digits':
                        textInputSurname = ['Can\'t contain digits'];
                        break;
                    case 'spaces':
                        textInputSurname = ['Can\'t contain spaces'];
                        break;
                    default: break;
                }
            }
            setErrors(Object.assign(err, { surnameError: { bool: true, errText: textInputSurname } }))
            return
        } else {
            setErrors(Object.assign(err, { surnameError: { bool: false, errText: null } }))
        }
        if (gender) {
            setErrors(Object.assign(err, { genderError: false }))
        } else {
            setErrors(Object.assign(err, { genderError: true }))
            return
        }
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
                    case 'min':
                        text = ['Min length is 8'];
                        break;
                    case 'digits':
                        text = ['Need at least 1 digit'];
                        break;
                    case 'uppercase':
                        text = ['Need at least 1 Uppercase letter'];
                        break;
                    case 'lowercase':
                        text = ['Need at least 1 Lowercase letter'];
                        break;
                    default: break;
                }
            }
            setErrors(Object.assign(err, { passwordError: { bool: true, errText: text } }))
            return

        } else {
            setErrors(Object.assign(err, { passwordError: { bool: false, errText: null } }))
        }
        let validator = require('email-validator');
        if (!validator.validate(email)) {
            setErrors(Object.assign(err, { emailError: {bool: true, errText: 'Email is not valid or already in use'} }))
            return

        } else {
            setErrors(Object.assign(err, { emailError: {bool: false, errText: 'Email is not valid or already in use'} }))
        }
        switch (phone.length) {
            case 9:
                if (
                    `${phone[0]}${phone[1]}${phone[2]}` === '010' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '011' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '012' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '033' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '041' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '043' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '055' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '077' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '091' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '093' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '094' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '095' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '096' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '098' ||
                    `${phone[0]}${phone[1]}${phone[2]}` === '099'
                ) {
                    setErrors(Object.assign(err, { phoneError: false }))
                    break;
                }else{
                    setErrors(Object.assign(err, { phoneError: true }))
                    return;
                }
            case 12:
                if (
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37410' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37411' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37412' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37433' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37441' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37443' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37455' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37477' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37491' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37493' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37494' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37495' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37496' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37498' ||
                    `${phone[0]}${phone[1]}${phone[2]}${phone[3]}${phone[4]}${phone[5]}` === '+37499'
                ) {
                    setErrors(Object.assign(err, { phoneError: false }))
                    break;
                }else{
                    setErrors(Object.assign(err, { phoneError: true }))
                    return;
                }
            default:
                setErrors(Object.assign(err, { phoneError: true }))
                return;
        }
        if(confirmPassword === password){
            setHasConfirmPasswordError(false)
        }else{
            setHasConfirmPasswordError(true)
            return
        }
    
        ifNoErrorsRegisterUser()
    
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            checkErrorsHandler();
        }
    }
    return (
        <div>
            <div style={classes.signUpContainer}>
                <Typography
                    variant='h3'
                    component='h3'
                    margin='normal'
                >Sign up</Typography>
                <TextField
                    autoFocus
                    margin='dense'
                    error={errors.nameError.bool}
                    helperText={errors.nameError.errText}
                    color='primary'
                    variant='outlined'
                    label='Name'
                    onChange={(e) => { setName(e.target.value) }}
                    onKeyPress = {e => {handleEnter(e)}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle'
                                    edge='end'
                                >
                                    <AccountBox />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin='dense'
                    error={errors.surnameError.bool}
                    helperText={errors.surnameError.errText}
                    color='primary'
                    variant='outlined'
                    label='Surname'
                    onChange={(e) => { setSurname(e.target.value) }}
                    onKeyPress = {e => {handleEnter(e)}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle'
                                    edge='end'
                                >
                                    <AccountBox />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin='dense'
                    error={errors.emailError.bool}
                    helperText={errors.emailError.bool ? errors.emailError.errText : null}
                    color='primary'
                    variant='outlined'
                    label='Email'
                    onChange={(e) => { setEmail(e.target.value) }}
                    onKeyPress = {e => {handleEnter(e)}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle'
                                    edge='end'
                                >
                                    <Email />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    margin='dense'
                    type={showPassword ? 'text' : 'password'}
                    error={errors.passwordError.bool}
                    helperText={errors.passwordError.bool ? errors.passwordError.errText.map((element, i) => {
                        return (<p key={i}> {element}</p>)
                    }) : null}
                    color='primary'
                    variant='outlined'
                    label='Password'
                    onChange={(e) => { setPassword(e.target.value) }}
                    onKeyPress = {e => {handleEnter(e)}}
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
                <TextField
                    margin='dense'
                    type={showPassword ? 'text' : 'password'}
                    error={hasConfirmPasswordError}
                    helperText={hasConfirmPasswordError ? 'Confirm password do not match' : null}
                    color='primary'
                    variant='outlined'
                    label='Confirm Password'
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                    onKeyPress = {e => {handleEnter(e)}}
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
                <TextField
                    margin='dense'
                    error={errors.phoneError}
                    helperText={errors.phoneError ? 'Phone number is not valid' : null}
                    color='primary'
                    variant='outlined'
                    label='Phone'
                    onChange={(e) => { setPhone(e.target.value) }}
                    onKeyPress = {e => {handleEnter(e)}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle'
                                    edge='end'
                                >
                                    <Phone />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div style={errors.genderError ? {border: '1px solid red', borderRadius: '5px', marginBottom: 2} : {border: 'none'}}>
                    <RadioGroup error="true" row aria-label='gender' name='gender1' onChange={(e) => { setGender(e.target.value) }}>
                        <FormControlLabel value='male' control={<Radio style={classes.radio} />} label='Male' />
                        <FormControlLabel value='female' control={<Radio style={classes.radio} />} label='Female' />
                    </RadioGroup>
                </div>
                <RouterLink to='/profile' style={classes.signButton}>
                    <Button
                        fullWidth
                        style={classes.signUpButton}
                        variant='contained'
                        onClick={()=>{checkErrorsHandler()}}
                    >Submit</Button>
                </RouterLink>
                <Button
                    fullWidth
                    style={classes.cancelButton}
                    variant='outlined'
                    onClick={() => dispatch(openSignUPAction())}
                >Cancel</Button>
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