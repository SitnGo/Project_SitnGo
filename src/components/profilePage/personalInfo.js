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
import CenteredTabs from './TabPanels/tabPanels';
import {useDispatch, useSelector, connect} from 'react-redux';
// let PassagerList = ['1','2','3','4','5','6','7','8','9', '10', '11', '12', '13', '14', '15'];
function usePersonalInfo() {
    const [PassagerList, setPassagerList ] = useState(null);
    const [DriverList, setDriverList] = useState(null);
    // const [isEdit, setEditValue] = useState(true);
    const [bool, changeBool] = useState(false);
    const [tabChange, setTabChange] = useState(false);
    const [user, setUser] = useState({});
    const [url, setUrl] = useState('');
    const classes = useStyles();
    const dispatch = useDispatch();
    let arr = [];
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
                console.log(user)
                if(user && user.userRoutesInfo && user.userRoutesInfo.routes){

                    setDriverList(user.userRoutesInfo.routes)
                }
               if(user && user.acceptedRoutes && user.acceptedRoutes.length){
                    setPassagerList(user.acceptedRoutes);
               }
                console.log(PassagerList);
            return user;
        }
        getMarker().then(result => {
            setUser(result);
            // setUrl(result.url)
            changeBool(true); 
        });
    },[update]);
    
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
                console.log(user)
                if(user && user.userRoutesInfo && user.userRoutesInfo.routes){

                    setDriverList(user.userRoutesInfo.routes)
                }
               if(user && user.acceptedRoutes && user.acceptedRoutes.length){
                    setPassagerList(user.acceptedRoutes);
               }
                // console.log(PassagerList);
            return user;
        }
        getMarker().then(result => {
            setUser(result);
            // setUrl(result.url)
            changeBool(true); 
        });
    },[]);

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
                    {bool ? <Typography className={classes.typography}>Name  -  {user && user.userInfo.name} </Typography>:<Skeleton height={60} component='p'/>}
                    {bool ? <Typography className={classes.typography}>Surname  -  {user && user.userInfo.surname}</Typography>:<Skeleton height={60} component='p'/> }
                    {bool ? <Typography className={classes.typography}>Phone  -  {user && user.userInfo.phone}</Typography>:<Skeleton height={60} component='p'/> } 
                    {bool ? <Typography className={classes.typography}>Email  -  {user && user.userInfo.email}</Typography>:<Skeleton height={60} component='p'/>}
                            </FadeIn>
                        ) : (
                            <>
                                {opneUpdateFormBool ? (
                                    <>
                                        <UpdateForm  data={[user.userInfo.email, user.userInfo.phone]} userId={localStorage.getItem('userId')}/>                          
                                        <Button 
                                        className={classes.confirmButton} 
                                        color='secondary'
                                        onClick={isConfirmBtnClick}
                                        >cancle</Button>
                                    </>
                                ) : <ConfirmPassword />}
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
            {/* <Paper><p>awdawd</p></Paper> */}
             <Grid item sm={8} xs={12} className={classes.personalInfoBlock2}>
                 {/* Switch */}
                 
                  <CenteredTabs tabChange={tabChange} setTabChange={setTabChange}/>
                
                 {tabChange ?  
                
                <FadeIn>
                 <div className={classes.cards}>
                 {DriverList && DriverList.map(el=>{
                         return <Passager key={el} data={el}/>
                     })}
                 </div>
                 </FadeIn>

                 : 
                 
                 <FadeIn>
                 <div className={classes.cards}>
                 {console.log(DriverList)}

                 {PassagerList && PassagerList.map(el=>{
                         return <Passager key={el} data={el}/>
                     })}
                 </div>
                 </FadeIn>
                 }
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
