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

function mapStateToProps(state) {
    return {
        confirmUpdate:state.confirmUpdate,
    };
}

function UpdateForm (props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
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
                         fire.auth().currentUser.updateEmail(email).then(()=>{
                        
                        })
                    
                    }
                    fire.firestore().collection("users").doc(fire.auth().currentUser.uid).update({
                            name: doc.data().name,
                            surname: doc.data().surname,
                            email: email,
                            gender: doc.data().gender,
                            phone: phone,
                    }).then(()=>{
                        dispatch(confirmUpdate());
                        props.setIsEdit(true);
                        props.setOpenUpdateForm(false);
                    });
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
      
    
////////////////////// delete user /////////////////////////////////////
function deleteUser () {
    const user = fire.auth().currentUser;
    //   fire.firestore().collection('users').doc(user.uid).get().then((doc)=> {
        
        //   if (!!doc.data().url !== false) {
        //     alert('storeage delete');
            
        //     storage.ref().child(`images/${user.uid}`).listAll().then(function(res) {
        //         res.items.forEach((itemRef) => {
                
        //         let desertRef = storage.ref(`images/${user.uid}`).child(itemRef.name);
                
        //             desertRef.delete().then(()=> {
        //                 alert('file deleted!');
        //             }).catch((error)=>{
        //                 console.log(error);
        //             });            

        //         });
        //     }).catch((error) => {
        //             console.log('error',error);
        //     });
        //   } 


    //  let subCollectionPath = '/users/kdjR7ArYaiONDqe6jO8qKOC7amE2/acceptedRoutes'            
    // fire.firestore().collection(subCollectionPath).get().then(val => {
    //     console.log(val);
    // })
    fire.firestore().collection('users').doc(user.uid).get().then((doc)=> {
        ///storige delete
        console.log(doc.data());
        // if (!!doc.data().url !== false) {
        //     alert('storeage delete');
            
        //     storage.ref().child(`images/${user.uid}`).listAll().then(function(res) {
        //         res.items.forEach((itemRef) => {
                
        //         let desertRef = storage.ref(`images/${user.uid}`).child(itemRef.name);
                
        //             desertRef.delete().then(()=> {
        //                 alert('file deleted!');
        //             }).catch((error)=>{
        //                 console.log(error);
        //             });            

        //         });
        //     }).catch((error) => {
        //         console.log('error',error);
        //     });
        // } 
        // acceptedRoutes and userRoutesInfo collections delete
        // fire.firestore().collection(`/users/${user.uid}/acceptedRoutes`).get().then(querySnapshot => {
        //     querySnapshot.forEach(doc => {
        //         fire.firestore().collection(`/users/${user.uid}/acceptedRoutes`).doc(doc.id).delete().then(()=>{
        //             alert('acceptedRoutes deleted');
        //         });
        //     })
        // })
        // fire.firestore().collection(`/users/${user.uid}/userRoutesInfo`).get().then(querySnapshot => {
        //     querySnapshot.forEach(doc =>{
        //         fire.firestore().collection(`/users/${user.uid}/userRoutesInfo`).doc(doc.id).delete().then(()=>{
        //             alert('userRoutesInfo deleted');
        //         });
        //     })
           
        });     
    // document delete
        
            // user.delete().then(() => {
            //     // User deleted.
            //     alert('user deleted');
            // }).catch(function(error) {
            //     console.log(error);
            // });
            // fire.firestore().collection('users').doc(user.uid).delete().then(()=> {
            //     alert('Document successfully deleted');
                
            // }).catch((error) => {console.log(error)})


    // });
        // delete subcollections
        
        
    // console.log(fire.firestore().batch());
        

                // function deleteAtPath(path) {
                    // var deleteFn = fire.functions().httpsCallable('recursiveDelete');
                    // deleteFn({ path: '/users/Ww7ADj83LMNdUSZ1VadSZEmaLww1/userRoutesInfo' })
                        // .then(function(result) {
                            // alert('delete');
                            // logMessage('Delete success: ' + JSON.stringify(result));
                        // })
                        // .catch(function(err) {
                            // logMessage('Delete failed, see console,');
                            // console.log(err);
                        // });
                // }
                
    //   })
    }
    
 //////////////////cancel///////////
   
    function CancelBtnClick() {
        props.setOpenUpdateForm(false);
        props.setIsEdit(true);
    }
    const clickOpenConfirmPassword = () => {
        setOpen(true);
    };
    return (
        <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            justify="center"
            alignItems="center"
        >
            <TextField  className={classes.textField}
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
            <TextField  className={classes.textField}
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
            <Grid
                container
                xs={12}
                justify='center'
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
            </Grid>
            <Button
                fullWidth
                className={classes.forgotButton}
                variant='text'
                onClick={clickOpenConfirmPassword}
            >
                Forgot password?
            </Button>
            <ForgotPassword open={open} setOpen={setOpen}/>
            <Button
                fullWidth
                color='secondary'
                variant='contained'
                onClick={deleteUser}
            >Delete</Button>
        </Grid>
    );
}

export default connect(mapStateToProps)(UpdateForm);