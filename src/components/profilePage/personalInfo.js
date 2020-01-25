import React,{useState, useEffect} from 'react';
import {Typography, Button, Avatar, Paper, Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import UpdateForm from './userUpdateForm/userUpdateForm';
import ConfirmPassword from './ConfirmPassword/confirmPassword';
import {isEdit1, openUpdateForm } from '../../actions/index';
import fire from '../../ConfigFirebase/Fire';
import FadeIn from 'react-fade-in';
import DropzoneDialog from './uploadImage/upload';
import Passager from './passagerDriver/Passager';
import Driver from './passagerDriver/Driver';
import CenteredTabs from './TabPanels/tabPanels';
import {useDispatch, useSelector, connect} from 'react-redux';
import useStyles from './style';

function usePersonalInfo() {
   
    const [PassagerList, setPassagerList ] = useState(null);
    const [DriverList, setDriverList] = useState(null);
    const [bool, changeBool] = useState(false);
    const [tabChange, setTabChange] = useState(false);
    const [user, setUser] = useState({});
    const [url, setUrl] = useState('');
    const [isPassengerDriverListDone, setIsPassengerDriverListDone] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    let update = useSelector(state => state.confirmUpdate);
    let user1 = useSelector(state => state.user);
    let isEdit = useSelector(state => state.isEdit1);
    let openUpdateFormBool = useSelector(state => state.opneUpdateForm);

    useEffect(()=>{
        console.log(user1)
        async function getMarker(user={}) {
            let userId = fire.auth().currentUser.uid;
            user = await fire.firestore().collection('users').doc(userId).get()
            user = user.data();

            if(user && user.userRoutesInfo && user.userRoutesInfo.routes){

                setDriverList(user.userRoutesInfo.routes)
            }
            if(user && user.acceptedRoutes && user.acceptedRoutes.length){
                setPassagerList(user.acceptedRoutes);
            }
            return user;
        }
        getMarker().then(result => {
            setUser(result);
            if(!result.hasOwnProperty('url')){
                result.url='';
            }
            setUrl(result.url);
            changeBool(true);
        });
    },[update]);



    function isEditBtnClick() {
        dispatch(isEdit1());
    }

    function isConfirmBtnClick() {
        dispatch(openUpdateForm());
        dispatch(isEdit1());
    }

    return(
        <Grid container sm={12}  className={classes.profileContainer}>
            {console.log("rerendered")}
            
            <Grid item sm={4} xs={12} className={classes.leftSide}>
                <Paper elevation={3} className={classes.personalInfoBlock1}>

                    <div className={classes.header2}>
                        {   isEdit ? (<Avatar className={classes.bigAvatar} src={bool ? url : ''}></Avatar>)
                            :
                            <DropzoneDialog url={url} setUrl={setUrl} />
                        }

                    </div>
                    <hr/>
                    {isEdit ? (
                        <FadeIn>   
                        <Paper className={classes.paper} elevation={3}>         
                            {bool ? <Typography className={classes.typography}>Name  -  {user && user.userInfo.name} </Typography>:<Skeleton height={60} component='p'/>}
                        </Paper>
                        <Paper className={classes.paper} elevation={3}>
                            {bool ? <Typography className={classes.typography}>Surname  -  {user && user.userInfo.surname}</Typography>:<Skeleton height={60} component='p'/> }
                        </Paper>
                        <Paper className={classes.paper} elevation={3}>
                            {bool ? <Typography className={classes.typography}>Phone  -  {user && user.userInfo.phone}</Typography>:<Skeleton height={60} component='p'/> } 
                        </Paper>
                        <Paper className={classes.paper} elevation={3}>    
                            {bool ? <Typography className={classes.typography}>Email  -  {user && user.userInfo.email}</Typography>:<Skeleton height={60} component='p'/>}
                        </Paper>   
                            </FadeIn>

                        ) : (
                            <>
                                
                                {openUpdateFormBool ? (
                                    <>
                                        <UpdateForm  data={[user.userInfo.email, user.userInfo.phone]} userId={fire.auth().currentUser.uid}/>                          
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
            <Grid item sm={8} xs={12} className={classes.personalInfoBlock2}>
                <CenteredTabs tabChange={tabChange} setTabChange={setTabChange}/>
                {tabChange ?
                    <FadeIn>
                        <div className={classes.cards}>
                            {DriverList && DriverList.map((el,i)=>{
                                return <Driver key={i} data={el} />
                            })}
                        </div>
                    </FadeIn>

                    :

                    <FadeIn>
                        <div className={classes.cards}>
                            {PassagerList && PassagerList.map((el,i)=>{
                                return <Passager key={i} data={el} setPassagerList={setPassagerList} />
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
        openUpdateForm:state.openUpdateForm,
    };
}
export default connect(mapStateToProps)(usePersonalInfo)
