import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
// import LocateControl from './passagerMap/LocateControl';
// import LeafletMap from './passagerMap/MapForGetRoute'; 
// import Map from './passagerMap/MapForGetRoute';
import fire from '../../../ConfigFirebase/Fire';
import Map from '../../getRout/map/MapForGetRoute'
import styles from '../../getRout/style';

function Passager(props) {
    const [open, setOpen] = useState(false);
    
    let classes = styles();
    let { data } = props;
    let startEnd = data.astartEnd.split('-');
    function deleteAcceptClick() {
        // let Id = data.userId;
        // let startDate = data.startDate;
        async function getMarker(user = {}) {
            let userId = fire.auth().currentUser.uid;
            user = await fire.firestore().collection("users").doc(userId).get()
            user = user.data();
            return user;
        }
        

        fire.firestore().collection('users').doc(data.userId).get().then(result => {
            return result.data()
        }).then((result) => {
            result.userRoutesInfo.routes.forEach((item) => {
                if (JSON.stringify(item) === JSON.stringify(data)) {
                    if(item.parameters.count === 0){
                        return 0;
                    }
                    if (typeof (item.parameters.count) !== 'number') {
                        item.parameters.count = +item.parameters.count;
                    }
                    item.parameters.count += 1;
                } 
            });
            fire.firestore().collection('users').doc(data.userId).set(result)
            return result;
        })
        getMarker().then(result=>{
            result.acceptedRoutes = result.acceptedRoutes.filter((item)=> {
               return ((item.userId !== data.userId) || (Date.parse(item.startDate) !== Date.parse(data.startDate)))
            })
            return result.acceptedRoutes;
        })
        .then(result=>{
            
            fire.firestore().collection("users").doc(fire.auth().currentUser.uid).update({acceptedRoutes: result}).then(()=>{
                getMarker().then(result=>{
               
                    
                    props.setPassagerList(result.acceptedRoutes)
                })
            })
        })
    }

    function openDialog() {
        setOpen(true);
    }
    function closeDialog() { 
        setOpen(false);
    }
    return (
    <>
        <Card style={{ width: '30%', margin: '5px', cursor:'pointer', boxShadow: '23px 3px 14px -4px rgba(0,0,0,0.75)' }} >
            <CardHeader avatar={<Avatar src={data.url} />} title={data.parameters.name} subheader={data.startDate} />
            <CardContent onClick={openDialog}>
                <Typography variant='body2' color='textSecondary' component='p'>from - {startEnd[0]}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>to - {startEnd[1]}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>distance - {data.parameters.distance}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>car model - {data.parameters.car}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>car number - {data.parameters.plate}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>price - {data.parameters.price}</Typography>
                <Typography variant='body2' color='textSecondary' component='p'>Driver Phone - {data.DriverPhone}</Typography>
            </CardContent>
            <Button
                // className={classes.rideListItem}
                variant='outlined'
                fullWidth
                onClick={deleteAcceptClick}
            >
                Delete Acception
            </Button>
        </Card>

         
        <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
        <div className={classes.mapContainer}><Map route={data}/></div>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        

    </>    
    );
}

export default Passager;