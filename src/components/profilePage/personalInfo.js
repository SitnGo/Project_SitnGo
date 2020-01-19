import React,{useState, useEffect} from 'react';
import {Typography, Button, Avatar, Paper, Grid} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Skeleton from '@material-ui/lab/Skeleton';
import Tab from './tabInformation';
import UpdateForm from './userUpdateForm/userUpdateForm';
import useStyles from './style';
import fire from '../../ConfigFirebase/Fire';
import {confirmUpdate} from '../sign_in/actions/index';
import FadeIn from 'react-fade-in';
import DropzoneDialog from './uploadImage/upload';
import { useDispatch, connect} from 'react-redux';

const dataList = [];

function mapStateToProps(state) {
    return {
        user: state.user,
        isLoggedInUser: state.isLoggedInUser,
    };
}

function usePersonalInfo(props) {
    const [isEdit, setEditValue] = useState(true);
    const [bool, changeBool] = useState(false);
    const [user, setUser] = useState({});
    const classes = useStyles();
    const dispatch = useDispatch();
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
            changeBool(true);
        });
    },[]);
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
                        {   isEdit ?
                            (<Avatar className={classes.bigAvatar} src={localStorage.getItem('url')}></Avatar>)
                            :
                            <DropzoneDialog/>
                        }
                    </div>
                    <hr/>
                    {isEdit ? (
                        <>
                            {bool ? <Typography className={classes.typography}>Name  -  {user.userInfo.name} </Typography>:<Skeleton height={60} component='p'/>}
                            {bool ? <Typography className={classes.typography}>Surname  -  {user.userInfo.surname}</Typography>:<Skeleton height={60} component='p'/> }
                            {bool ? <Typography className={classes.typography}>Phone  -  {user.userInfo.phone}</Typography>:<Skeleton height={60} component='p'/> }
                            {bool ? <Typography className={classes.typography}>Email  -  {user.userInfo.email}</Typography>:<Skeleton height={60} component='p'/>}
                        </>
                    ) : (
                        <>
                            <FadeIn>
                                <UpdateForm
                                    data={bool ? [user.userInfo.email, user.userInfo.email] : null}
                                    userId={fire.auth().currentUser.uid}
                                />
                                <Button
                                    className={classes.confirmButton}
                                    onClick={isConfirmBtnClick}
                                    variant='contained'
                                    color='secondary'
                                >cancel</Button>
                            </FadeIn>
                        </>
                    )}
                    <Button
                        className={isEdit ? classes.editButton : classes.hideEditButton}
                        variant='contained' color='secondary'
                        onClick={isEditBtnClick}
                    >
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

export default connect(mapStateToProps)(usePersonalInfo)
