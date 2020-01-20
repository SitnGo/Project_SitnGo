import React,{useState, useEffect} from 'react';     
import {Typography, Button, Avatar, Paper, Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import UpdateForm from './userUpdateForm/userUpdateForm';
import ConfirmPassword from './ConfirmPassword/confirmPassword';
import {isEdit1, openUpdateForm } from '../sign_in/actions/index';
import useStyles from './style';
import fire from '../../ConfigFirebase/Fire';
import FadeIn from 'react-fade-in';
import DropzoneDialog from './uploadImage/upload';
import Passager from './passager/Passager';
import {useDispatch, useSelector, connect} from 'react-redux';
function usePersonalInfo() {
    // const [isEdit, setEditValue] = useState(true);
    const [bool, changeBool] = useState(false);
    const [user, setUser] = useState({});
    const [url, setUrl] = useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    let update = useSelector(state => state.confirmUpdate);
    let isEdit = useSelector(state => state.isEdit1);
    let opneUpdateFormBool = useSelector(state => state.opneUpdateForm);
    useEffect(()=>{
        async function getMarker(user={}) {
            let userId;
            if (localStorage.getItem('userId')){
                userId = localStorage.getItem('userId')                
            }else{
                userId = fire.auth().currentUser.uid;
            }
            user = await fire.firestore().collection('users').doc(userId).get()
                user = user.data();
            return user;
        }
        getMarker().then(result => {
            setUser(result);
            setUrl(result.url)
            changeBool(true); 
        });
    },[update]);
    
    function isEditBtnClick() {
        // setEditValue(false);
        dispatch(isEdit1());
    }

    function isConfirmBtnClick() {
        // setEditValue(true);
        dispatch(openUpdateForm());
        dispatch(isEdit1());
    }

    return(
<Grid container sm={12}  className={classes.profileContainer}>
            
            <Grid item sm={4} xs={12} className={classes.leftSide}>
                <Paper elevation={3} className={classes.personalInfoBlock1}>
            
                <div className={classes.header2}>
                {   isEdit ? (<Avatar className={classes.bigAvatar} src={bool ? url : ''}></Avatar>)
                 :
                    <DropzoneDialog url={url} setUrl={setUrl} update={update}/>
                }
                
            </div>
                  <hr/>
                    {isEdit ? (
                        <FadeIn>      
                    {bool ? <Typography className={classes.typography}>Name  -  {user.userInfo.name} </Typography>:<Skeleton height={60} component='p'/>}
                    {bool ? <Typography className={classes.typography}>Surname  -  {user.userInfo.surname}</Typography>:<Skeleton height={60} component='p'/> }
                    {bool ? <Typography className={classes.typography}>Phone  -  {user.userInfo.phone}</Typography>:<Skeleton height={60} component='p'/> } 
                    {bool ? <Typography className={classes.typography}>Email  -  {user.userInfo.email}</Typography>:<Skeleton height={60} component='p'/>}
                            </FadeIn>
                        ) : (
                            <>
                                {opneUpdateFormBool ? (
                                    <>
                                        <UpdateForm  userId={localStorage.getItem('userId')}/>                          
                                        <Button 
                                        className={classes.confirmButton} 
                                        color='secondary'
                                        onClick={isConfirmBtnClick}
                                        >cancle</Button>
                                    </>
                                ) : <ConfirmPassword />}
                                
                              
                            {/* <FadeIn>
                                <UpdateForm  userId={localStorage.getItem('userId')}/>                          
                                <Button className={classes.confirmButton} 
                                color='secondary'
                                onClick={isConfirmBtnClick}
                                >cancle</Button>
                            </FadeIn> */}
                        </>
                    )}
                
                    <Button 
                        className={isEdit ? classes.editButton : classes.hideEditButton} 
                        disabled={bool ? false : true}    
                        variant='contained'
                        color='secondary'
                        onClick={isEditBtnClick}>
                        <EditIcon/>Edit
                    </Button>
               
             </Paper>
            </Grid>
             <Grid item sm={8} xs={12} className={classes.personalInfoBlock2}>
                {/* <Paper elevation={4} className={classes.personalInfoBlock2}> */}
                <Passager/>
                
                {/* </Paper> */}
            </Grid>
</Grid>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user,
        isLoggedInUser: state.isLoggedInUser,
        isEdit1:state.isEdit1,
        opneUpdateForm:state.opneUpdateForm,
    };
}
export default connect(mapStateToProps)(usePersonalInfo)
