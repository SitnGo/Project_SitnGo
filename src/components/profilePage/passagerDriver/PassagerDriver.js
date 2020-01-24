import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography, Button } from '@material-ui/core';
import fire from '../../../ConfigFirebase/Fire';

function PassagerDriver(props) {
    let { data } = props;
    let startEnd = data.astartEnd.split('-');
    function deleteAcceptClick() {
        console.log(data)
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
    return (
        <Card style={{ width: '30%', margin: '5px' }}>
            <CardHeader avatar={<Avatar src='' />} title={data.parameters.name} subheader={data.startDate} />
            <CardContent>
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
    );
}

export default PassagerDriver;