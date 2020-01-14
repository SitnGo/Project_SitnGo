import React,{useState, useEffect} from 'react';
import {Typography, Button, Avatar, Paper, Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Tab from './tabInformation';
import useStyles from './style';
import fire from '../../ConfigFirebase/Fire';
import SignUp from '../signUp/signUp';
import FadeIn from 'react-fade-in';
import { FilePicker } from 'react-file-picker'
import Skeleton from '@material-ui/lab/Skeleton';
const dataList = [];
function usePersonalInfo() {
    const [isEdit, setEditValue] = useState(true);
    const [bool, changeBool] = useState(false);
    const classes = useStyles();
    useEffect(()=>{
        fire.firestore().collection("users")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.docs.forEach((doc)=> {
            if(doc.id === fire.auth().currentUser.uid) {
                let user = doc.data();
                dataList.push(user.userInfo);
                
            }
        });
        changeBool(true);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    });
    function isEditBtnClick() {
        setEditValue(false); 
    }
    function isConfirmBtnClick() {
        setEditValue(true);
    }

    return(
<Grid container sm={12}  className={classes.profileContainer}>
        {/* Don't remove!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            <Grid item sm={4} xs={12}>
                <Paper elevation={3} className={classes.personalInfoBlock1}>
            
                <div className={classes.header2}>
            {isEdit ? (<Avatar className={classes.bigAvatar} src="./images/avatar.png"></Avatar>)
                :
                (<FilePicker 
                    extensions={['jpg', 'jpeg', 'png']}
                    dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                >
                    <Avatar className={classes.bigAvatar} style={{cursor:"pointer"}}><img src="./images/avatar.png" width="100%" alt="avatar"/></Avatar>   
                </FilePicker>) }
            </div>
                  <hr/>
                    {isEdit ? (
                            <>  
                    {bool ? <Typography className={classes.typography}>Name  -  {dataList[0].name} </Typography>:<Skeleton height={60} component="p"/>}
                    {bool ? <Typography className={classes.typography}>Surname  -  {dataList[0].surname}</Typography>:<Skeleton height={60} component="p"/> }
                    {bool ? <Typography className={classes.typography}>Phone  -  {dataList[0].phone}</Typography>:<Skeleton height={60} component="p"/> } 
                    {bool ? <Typography className={classes.typography}>Email  -  {dataList[0].email}</Typography>:<Skeleton height={60} component="p"/>}
                        </>
                        ) : (
                            <>
                            <FadeIn>
                                {/* Delete sign up*/}
                                <SignUp/>
                                {/* // */}
                                <Button className={classes.confirmButton} onClick={isConfirmBtnClick} variant="contained"   color="secondary">cancel</Button>
                            </FadeIn>
                        </>
                    )}
                
                    <Button className={isEdit ? classes.editButton : classes.hideEditButton} 
                        variant="contained" color="secondary"
                        onClick={isEditBtnClick}>
                            <EditIcon/>Edit
                </Button>
               
             </Paper>
            </Grid>
             <Grid item sm={8} xs={12}>
                <Paper elevation={4} className={classes.personalInfoBlock2}>
                <Tab/>
                </Paper>
            </Grid>
</Grid>
    );
}

export default usePersonalInfo;