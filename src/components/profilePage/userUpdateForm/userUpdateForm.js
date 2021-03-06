import React,{useState, useEffect} from 'react';
import useStyles from './style';
import {Grid, TextField, Button} from '@material-ui/core';
import { Phone, Email} from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import fire from '../../../ConfigFirebase/Fire';
import {confirmUpdate} from '../../../actions/index';
import {useDispatch, connect } from 'react-redux';
import ChangePassword from '../Changepassword/changePassword';
import DeleteAccount from '../delete/delete'; 

function mapStateToProps(state) {
    return {
        confirmUpdate:state.confirmUpdate,
    };
}

function UpdateForm (props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [email, setEmail] = useState(props.data[0]);
    const [phone, setPhone] = useState(props.data[1]);
    const [errors, setErrors] = useState({ 
        emailError: { bool: false, errText: '' },
        phoneError: false,
    });
 
//////////////////////get all errors in array/////////////////////////////////////
useEffect((() => {  
let arrFromErrorsValues = Object.values(errors)
    arrFromErrorsValues = arrFromErrorsValues.map(item => {
        if (item.hasOwnProperty("bool")) {
            return item.bool;
        } else {
            return item;
        }
    });
     //////////////////check errors/////////////////////
        if ((arrFromErrorsValues.every(item => item === false))) {
            fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then((doc)=>{
                if(email.toLowerCase() !== props.data[0]) {
                        fire.auth().currentUser.updateEmail(email).then(()=>{
                            fire.firestore().collection("users").doc(fire.auth().currentUser.uid).update({
                            email: email.toLowerCase()
                            }).then(()=> {
                                dispatch(confirmUpdate());
                                props.setIsEdit(true);
                                props.setOpenUpdateForm(false);
                            });

                        }).catch(() => {
                            let err = Object.assign({}, errors);
                            setErrors(Object.assign(err, { emailError: {bool: true, errText: 'Email is not valid or already in use'} }))
                        });
                }

                if(phone !== props.data[1]) {
                    fire.firestore().collection("users").doc(fire.auth().currentUser.uid).update({
                        phone,
                    }).then(()=> { 
                        dispatch(confirmUpdate());
                        props.setIsEdit(true);
                        props.setOpenUpdateForm(false);
                    });
                }
            
            });
            
        }
    }), [errors])
    function checkErrorsHandler() {
        let err = Object.assign({}, errors);
/////////////////////////////////////////////////email/////////////////////////////////
        let validator = require("email-validator");
        if (!validator.validate(email)) {
            setErrors(Object.assign(err, { emailError: {bool: true, errText: "Email is not valid or already in use"} }))
            return;
        } else {
            setErrors(Object.assign(err, { emailError: false }))
        }

/////////////////////////////////////////////////phone////////////////////////////////
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

 //////////////////cancel///////////
   
    function CancelBtnClick() {
        props.setOpenUpdateForm(false);
        props.setIsEdit(true);
    }

    const clickOpenDeleteAccount = () => {
        setOpenDeleteDialog(true);
    };

    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            checkErrorsHandler
            ();
        }
    }

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
        >
            <Grid
                item
                xs={12}
            >
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                >
                    <TextField  className={classes.textField}
                        label="email"
                        variant="filled"
                        onChange={(e) => {setEmail(e.target.value)}}
                        onKeyPress = {e => {handleEnter(e)}}
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
                    <TextField  className={classes.textField}
                        label="phone"
                        variant="filled"
                        onChange={(e) => {setPhone(e.target.value)}}
                        onKeyPress = {e => {handleEnter(e)}}
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
                </Grid>
                <Grid
                    container
                    className={classes.updateCancelContainer}
                >
                    <Button
                        variant='contained'
                        className={classes.confirmButton}
                        onClick={checkErrorsHandler}
                    >Update</Button>
                    <Button
                        variant='outlined'
                        className={classes.cancelButton}
                        onClick={CancelBtnClick}
                    >Cancel</Button>
                    <ChangePassword/>
                    <Button
                        fullWidth
                        color='secondary'
                        variant='contained'
                        onClick={clickOpenDeleteAccount}
                    >Delete</Button>
                    <DeleteAccount  open={openDeleteDialog} setOpen={setOpenDeleteDialog}/>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default connect(mapStateToProps)(UpdateForm);