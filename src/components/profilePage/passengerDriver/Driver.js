import React from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography, Button } from '@material-ui/core';
import fire from '../../../ConfigFirebase/Fire';
import styles from './style';

function Driver(props) {
    let { dataRef } = props;
    let data = dataRef.data()    
    let startEnd = data.astartEnd.split('-');
    let classes = styles();
    function deleteDriveClick() {
  
        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("userRoutesInfo").get().then((result)=>{
            result.forEach(async function(item){
                console.log(item.data())
                
                if(fire.firestore().doc(item.ref.path).isEqual(fire.firestore().doc(dataRef.ref.path))){
                   await fire.firestore().doc(item.ref.path).delete().then(()=>{props.setRenderDriver(!props.renderDriver)})
                }
            })
        })
    }
    return (
        <Card className={classes.card}>
            <CardHeader 
            avatar={<Avatar src={data.url} />} 
            title={data.parameters.name} 
            subheader={data.startDate} 
            />
            <CardContent className={classes.info}>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >from - {startEnd[0]}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >to - {startEnd[1]}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >Current Free Seats - {data.parameters.count}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >distance - {data.parameters.distance}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >car model - {data.parameters.car}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >car number - {data.parameters.plate}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >price - {data.parameters.price}</Typography>
                <Typography
                    align ='justify'
                    variant='overline'
                    component='p'
                >Driver Phone - {data.DriverPhone}</Typography>
            </CardContent>
            <Button
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