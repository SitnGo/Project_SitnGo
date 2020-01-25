import React from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography, Button } from '@material-ui/core';
import fire from '../../../ConfigFirebase/Fire';

function Passager(props) {
    let { dataRef } = props;
    let data = dataRef.data()
    let startEnd = data && data.astartEnd.split('-');
    function deleteAcceptClick() {
        let PassagerListArr = [];
        console.log(dataRef.ref.path)
        fire.firestore().doc(dataRef.ref.path).set({parameters: {...data.parameters, count: data.parameters.count+1}},{merge: true})
        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("acceptedRoutes").get().then((result)=>{
            result.forEach((item)=>{
                if(item.data().ref.isEqual(fire.firestore().doc(dataRef.ref.path))){
                    fire.firestore().doc(item.ref.path).delete().then(() => {
                            fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("acceptedRoutes").get().then((res) => {
                                res.forEach((item) => {
                                    item.data().ref.get().then(result => {
                                        PassagerListArr.push(result)
                                    })
                                })
                            })
                            props.setPassagerList(PassagerListArr)
                        })
                }
            })
        })
    }
    return <>
    { data ?   
        <Card style={{ width: '30%', margin: '5px' }}>
            <CardHeader avatar={<Avatar src='' />} title={data.parameters.name} subheader={data.startDate} />
            <CardContent>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>from - {startEnd[0]}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>to - {startEnd[1]}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>Current Free Seats - {data.parameters.count}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>distance - {data.parameters.distance}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>car model - {data.parameters.car}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>car number - {data.parameters.plate}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>price - {data.parameters.price}</Typography>
                <Typography align ='center' variant='body2' color='textSecondary' component='p'>Driver Phone - {data.DriverPhone}</Typography>
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
        : 
        <Card style={{ width: '30%', margin: '5px' }}>
            <CardHeader avatar={<Avatar src='' />} title="DELETED" />
            <CardContent>
                <Typography variant='h6' color='textSecondary' component='p'>This Route Deleted by Driver</Typography>
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
    }
    </>
}

export default Passager;