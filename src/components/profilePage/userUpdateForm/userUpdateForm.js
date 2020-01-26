import React,{useState, useEffect} from 'react';
import useStyles from './style';
import {Grid, TextField, Button} from '@material-ui/core';
import { Phone, Email} from "@material-ui/icons"
import InputAdornment from '@material-ui/core/InputAdornment';
import fire from '../../../ConfigFirebase/Fire';
import storage from '../../../ConfigFirebase/storage';
import {confirmUpdate} from '../../../actions/index';
import {useDispatch, connect } from 'react-redux';
import ForgotPassword from '../Forgotpassword/forgotPassword';
import {isEdit1, openUpdateForm } from '../../../actions/index';
function UpdateForm (props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState(props.data[0]);
    const [phone, setPhone] = useState(props.data[1]);
    const [errors, setErrors] = useState({ 
        emailError: { bool: false, errText: '' },
        nameError: { bool: false, errText: '' },
        surnameError: { bool: false, errText: '' },
        genderError: false,
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
     if(email !== props.data[0] || phone !== props.data[1]) {
            if ((arrFromErrorsValues.every(item => item === false))) {
                fire.firestore().collection("users").doc(fire.auth().currentUser.uid).get().then((doc)=>{
                    if(email !== props.data[0]) {
                fire.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        
                        fire.auth().currentUser.updateEmail(email).then(()=>{
                            alert(user.email);
                        })
                        
                    } else {
                        console.log("error");
                    }
                });
            }
                    fire.firestore().collection("users").doc(fire.auth().currentUser.uid).update({
                            name: doc.data().name,
                            surname: doc.data().surname,
                            email: email.toLowerCase(),
                            gender: doc.data().gender,
                            phone: phone,
                    }).then(()=>{
                            alert("Update confirm!");
                            dispatch(confirmUpdate()
                         )});
                
                });
                
            }
            
        }
    }), [errors])
    function checkErrorsHandler() {
        let err = Object.assign({}, errors);
/////////////////////////////////////////////////email/////////////////////////////////
        let validator = require("email-validator");
        if (!validator.validate(email)) {
            setErrors(Object.assign(err, { emailError: {bool: true, errText: "Email is not valid or already in use"} }))
        } else {
            setErrors(Object.assign(err, { emailError: false }))
        }

/////////////////////////////////////////////////phone////////////////////////////////
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
         //////////////////cancel///////////
    function isConfirmBtnClick() {
        dispatch(openUpdateForm());
        dispatch(isEdit1());
    }   
    
////////////////////// delete user /////////////////////////////////////
console.log(fire.auth().currentUser.uid);
console.log(fire.auth().currentUser);
    function deleteUser () {
    const user = fire.auth().currentUser;
    user.delete().then(() => {
        // User deleted.

        fire.firestore().collection('users').doc(user.uid).delete().then(()=> {
            alert('Document successfully deleted');
        }).catch((error) => {console.log(error)})
        
        storage.ref().child(`images/${user.uid}`).listAll().then(function(res) {
            res.items.forEach((itemRef) => {
            
            let desertRef = storage.ref(`images/${user.uid}`).child(itemRef.name);
            
                desertRef.delete().then(()=> {
                    alert('file deleted!');
                }).catch((error)=>{
                    console.log(error);
                });            

            });
        }).catch((error) => {
                console.log('error',error);
        });

        
      }).catch(function(error) {
        console.log(error);
      });
    }
    
    function CancelBtnClick() {
        dispatch(isEdit1());
        
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
            <ForgotPassword/>
            <Grid
                container
                xl={4}
                lg={4}
                md={4}
                sm={6}
                xs={6}
                justify='flex-end'
                className={classes.updateCancelContainer}
            >
                <Button className={classes.confirmButton} color="primary" onClick={checkErrorsHandler}>Update</Button>
                <Button className={classes.cancelButton} color="secondary" onClick={isConfirmBtnClick}>Cancel</Button>
            </Grid>
            <Button fullWidth color='secondary' variant='contained' onClick={deleteUser}>Delete</Button>
            
        </Grid>
        
    );
}
function mapStateToProps(state) {
    return {
        confirmUpdate:state.confirmUpdate,
        isEdit1:state.isEdit1,
        openUpdateForm:state.openUpdateForm,
    };
}
export default connect(mapStateToProps)(UpdateForm);