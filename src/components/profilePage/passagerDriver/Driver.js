import React, {useState} from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography, Button } from '@material-ui/core';
import fire from '../../../ConfigFirebase/Fire';

function Driver(props) {
    let { dataRef } = props;
    let data = dataRef.data()    
    let startEnd = data.astartEnd.split('-');
    function deleteDriveClick() {
  
        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("userRoutesInfo").get().then((result)=>{
            result.forEach(async function(item){
                console.log(item.data())
                
                if(fire.firestore().doc(item.ref.path).isEqual(fire.firestore().doc(dataRef.ref.path))){
                   await fire.firestore().doc(item.ref.path).delete().then(()=>{props.setRenderDriver(!props.renderDriver)})
                }
            })
        })
  
        // console.log(data)
        // fire.firestore().doc(dataRef.ref.path).delete().then(() => {
        //     let DriverListArr=[];
        //     fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("userRoutesInfo").get().then((res) => {
        //         res.forEach((item) => {
        //             item.get().then(result => {
        //                 DriverListArr.push(result)
        //             })
        //         })
        //     })
        //     props.setDriverList(DriverListArr)
        // })
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
                onClick={deleteDriveClick}
            >
                Delete Drive
            </Button>
        </Card>
    );
}

export default Driver;