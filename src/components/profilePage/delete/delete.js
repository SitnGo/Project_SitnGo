import React, {useState} from 'react';
import fire from '../../../ConfigFirebase/Fire'
import storage from '../../../ConfigFirebase/storage';
import styles from './style';
import {Redirect} from 'react-router-dom';
import {
        Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogContentText, 
        DialogTitle
} from '@material-ui/core';

function DeleteAccount(props) {
    const classes = styles();
    const [bool, setBool] = useState(false);
    const handleDelete = () => {
        const user = fire.auth().currentUser;
        // fire.firestore().collection('users').doc(user.uid).get().then((doc)=> {
            //storige delete
            // if (!!doc.data().url !== false) {
                storage.ref().child(`images/${user.uid}`).listAll().then((res) => {
                    res.items.forEach((itemRef) => {
                    
                    let desertRef = storage.ref(`images/${user.uid}`).child(itemRef.name);
                    
                        desertRef.delete().catch((error)=>{
                            console.log(error);
                        });            
    
                    });
                }).catch((error) => {
                    console.log('error',error);
                });
            // } 
            // acceptedRoutes and userRoutesInfo collections delete
            fire.firestore().collection(`/users/${user.uid}/acceptedRoutes`).get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    fire.firestore().collection(`/users/${user.uid}/acceptedRoutes`).doc(doc.id).delete();
                })
            }).catch((error) => {console.log(error)})
            fire.firestore().collection(`/users/${user.uid}/userRoutesInfo`).get().then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    fire.firestore().collection(`/users/${user.uid}/userRoutesInfo`).doc(doc.id).delete();
                })
               
            }).catch((error) => {console.log(error)})  
                  // document delete
            
                fire.firestore().collection('users').doc(user.uid).delete().then(()=> {
                    user.delete().catch(function(error) {
                        console.log(error);
                    });
    
                    
                }).catch((error) => {console.log(error)})
    
    
        // });
        props.setOpen(false);
        setBool(true);
        
    };
    const handleClose = () => {
        props.setOpen(false);
    };
        
    return (
        <>
            { bool ? <Redirect to='/'/> : null}
            <Dialog open={props.open} onClose={handleClose} aria-labelledby='form-dialog-title'>
                <DialogTitle id='form-dialog-title'>Delete account</DialogTitle>
                
                    <DialogContent>
                        <DialogContentText>
                            After you delete an account, it's permanently deleted. Accounts can't be undeleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            className={classes.deleteButton}
                            variant='contained'
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteAccount;