import React,{useState, useEffect} from 'react';
import {Typography, Button, Avatar, Paper, Grid} from '@material-ui/core';
import {Phone, Email, AccountBox, Edit} from '@material-ui/icons'
import Skeleton from '@material-ui/lab/Skeleton';
import UpdateForm from './userUpdateForm/userUpdateForm';
import ConfirmPassword from './ConfirmPassword/confirmPassword';
import fire from '../../ConfigFirebase/Fire';
import FadeIn from 'react-fade-in';
import DropzoneDialog from './uploadImage/upload';
import Passenger from './passengerDriver/Passenger';
import Driver from './passengerDriver/Driver';
import CenteredTabs from './TabPanels/tabPanels';
import { useSelector, connect } from 'react-redux';
import styles from './style';

function mapStateToProps(state) {
    return {
        user: state.user,
        isLoggedInUser: state.isLoggedInUser,
        isEdit1:state.isEdit1,
        openUpdateForm:state.openUpdateForm,
    };
}

function PersonalInfo() {
    const [PassagerList, setPassagerList] = useState(null);
    const [DriverList, setDriverList] = useState(null);
    const [bool, changeBool] = useState(false);
    const [tabChange, setTabChange] = useState(false);
    const [user, setUser] = useState({});
    const [url, setUrl] = useState('');
    const [render, setRender] = useState(false);
    const [renderDriver, setRenderDriver] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [openUpdateForm, setOpenUpdateForm] = useState(false);
    const classes = styles();
    let update = useSelector(state => state.confirmUpdate);
    let user1 = useSelector(state => state.user);
    useEffect(()=>{
        async function getMarker(user={}) {
            let userId = fire.auth().currentUser.uid;
            user = await fire.firestore().collection('users').doc(userId).get()
            user = user.data();
            let DriverListArr = [];
            let PassagerListArr = [];
            await fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("acceptedRoutes").get().then((res) => {
                res.forEach((item) => {
                    item.data().ref.get().then(result => {
                        PassagerListArr.push(result)
                    })
                })
            });
            await fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("userRoutesInfo").get().then((res) => {
                res.forEach(item => {
                    DriverListArr.push(item)
                })
            });
            setDriverList(DriverListArr);
            setPassagerList(PassagerListArr);
            return user;
        }
        getMarker().then(result => {
            setUser(result);
            setUrl(result && result.url);
            changeBool(true);
        });
    },[update, user1, render, renderDriver]);

  
    function isEditBtnClick() {
        setIsEdit(false);
    }

    return(
        <Grid
            container
            xs={12}
            className={classes.profileContainer}
        >
            <Grid
                item
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                className={classes.leftSide}
            >
                <div className={classes.avatarContainer}>
                    { isEdit ?
                        (<>
                            <Avatar
                                src={bool ? url : ''}
                                variant='circle'
                                className={classes.bigAvatar}
                            />
                            <Button
                                className={isEdit ? classes.editButton : classes.hidden}
                                disabled={bool ? false : true}
                                variant='contained'
                                color='secondary'
                                onClick={isEditBtnClick}
                            >
                                <Edit/> Edit
                            </Button>
                        </>)
                        :
                            <DropzoneDialog url={url} setUrl={setUrl} />
                    }
                </div>
                <hr/>
                {
                    isEdit ? (
                        <FadeIn>
                            <Paper className={classes.paper} elevation={3}>
                                <AccountBox fontSize="large"/>
                                {
                                    bool ?
                                        <Typography className={classes.typography}>
                                            {user && user.name}
                                        </Typography>
                                    :
                                        <Skeleton width={600} height={40} component='p'/>
                                }
                            </Paper>
                            <Paper className={classes.paper} elevation={3}>
                                <AccountBox fontSize="large"/>
                                {
                                    bool ?
                                        <Typography className={classes.typography}>
                                            {user && user.surname}
                                        </Typography>
                                    :
                                        <Skeleton width={600}  height={40} component='p'/>
                                }
                            </Paper>
                            <Paper className={classes.paper} elevation={3}>
                                <Phone fontSize="large"/>
                                {
                                    bool ?
                                        <Typography className={classes.typography}>
                                            {user && user.phone}
                                        </Typography>
                                    :
                                        <Skeleton width={600}  height={40} component='p'/>
                                }
                            </Paper>
                            <Paper className={classes.paper} elevation={3}>
                                <Email fontSize="large"/>
                                {
                                    bool ?
                                        <Typography className={classes.typography}>
                                            {user && user.email}
                                        </Typography>
                                    :
                                        <Skeleton width={600}  height={40} component='p'/>
                                }
                            </Paper>
                        </FadeIn>
                    ) : (
                        <>
                            {openUpdateForm ? (
                                <UpdateForm  
                                    data={[user.email, user.phone]} 
                                    isEdit={isEdit} 
                                    setIsEdit={setIsEdit}
                                    openUpdateForm={openUpdateForm}
                                    setOpenUpdateForm={setOpenUpdateForm}

                                />                          
                             ) : <ConfirmPassword 
                                    isEdit={isEdit} 
                                   setIsEdit={setIsEdit}
                                   setOpenUpdateForm={setOpenUpdateForm}
                             />} 
                        </>
                    )
                }
            </Grid>
            <Grid
                item
                xl={9}
                lg={9}
                md={8}
                sm={6}
                xs={12}
                className={classes.personalInfoBlock2}
            >
                <CenteredTabs tabChange={tabChange} setTabChange={setTabChange} />
                {tabChange ?
                    <FadeIn>
                        <div className={classes.cards}>
                            {DriverList && DriverList.map((el, i) => {
                                return <Driver key={i} dataRef={el} renderDriver={renderDriver} setRenderDriver={setRenderDriver}/>
                            })}
                        </div>
                    </FadeIn>
                    :
                    <FadeIn>
                        <div className={classes.cards}>
                            {PassagerList && PassagerList.map((el, i) => {
                                return <Passenger key={i} dataRef={el} render={render} setRender={setRender} />
                            })}
                        </div>
                    </FadeIn>
                }
            </Grid>
        </Grid>
    );
}

export default connect(mapStateToProps)(PersonalInfo)
