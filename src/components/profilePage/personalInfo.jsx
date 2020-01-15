import React,{useState, useEffect} from 'react';
import {Typography, Button, Avatar, Paper, Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import Tab from './tabInformation';
import UpdateForm from './userUpdateForm/userUpdateForm1';
import useStyles from './style';
import fire from '../../ConfigFirebase/Fire';
import { useDispatch, connect } from 'react-redux';
import {confirmUpdate} from '../sign_in/actions/index';
import FadeIn from 'react-fade-in';
import { FilePicker } from 'react-file-picker'
import DropzoneDialog from './uploadImage/upload';

const dataList = [];

function usePersonalInfo() {
    
    const [isEdit, setEditValue] = useState(true);
    const [bool, changeBool] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=>{
        
        fire.firestore().collection("users")
    .get()
    .then(function(querySnapshot) {
        
        
        querySnapshot.docs.forEach((doc)=> {
            
            if(doc.id === fire.auth().currentUser.uid) {
                
                dataList.push(doc.data());
                
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
        dispatch(confirmUpdate());
    }
    function isConfirmBtnClick() {
        setEditValue(true);
    
    }
  
    return(
<Grid container sm={12}  className={classes.profileContainer}>
            <Grid item sm={4} xs={12}>
                <Paper elevation={3} className={classes.personalInfoBlock1}>
            
                <div className={classes.header2}>
                {   isEdit ? (<Avatar className={classes.bigAvatar} src="./images/avatar.png"></Avatar>)
                 :
                    <DropzoneDialog/>
                }
                
            </div>
                  <hr/>
                    {isEdit ? (
                    
                            <>  
                    {bool ? <Typography className={classes.typography}>Name  -  {dataList[0].name} </Typography>:<Skeleton height={60} component="p"/>}
                    {bool ? <Typography className={classes.typography}>Surname  -  {dataList[0].surname}</Typography>:<Skeleton height={60} component="p"/> }
                    {bool ? <Typography className={classes.typography}>Email  -  {dataList[0].email}</Typography>:<Skeleton height={60} component="p"/>}
                    {bool ? <Typography className={classes.typography}>Phone  -  {dataList[0].phone}</Typography>:<Skeleton height={60} component="p"/> } 
                    
                        </>
                        ) : (
                            <>
                            <FadeIn>
                                <UpdateForm data={bool ? [dataList[0].email, dataList[0].phone] : null} userId={fire.auth().currentUser.uid}/>
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
function mapStateToProps(state) {
    return {
        confirmUpdate: state.confirmUpdate
    };
}
export default connect(mapStateToProps)(usePersonalInfo);