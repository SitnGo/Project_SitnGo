import React, {useState} from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Typography,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import fire from '../../../ConfigFirebase/Fire';
import Map from '../../getRout/map/MapForGetRoute'
import styles from './style';
function Passenger(props) {
    const [open, setOpen] = useState(false);
    let classes = styles();
    let { dataRef } = props;
    let data = dataRef.data()
    let startEnd = data && data.astartEnd.split('-');
    function deleteAcceptClick() {
        if(dataRef.exists){
            fire.firestore().doc(dataRef.ref.path).set({parameters: {...data.parameters, count: data.parameters.count+1}},{merge: true})
        }
        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("acceptedRoutes").get().then((result)=>{
            result.forEach(async function(item){
    
                if(item.data().ref.isEqual(fire.firestore().doc(dataRef.ref.path))){
                   await fire.firestore().doc(item.ref.path).delete().then(()=>{props.setRender(!props.render)})
                }
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
            { data ?
                <Card className={classes.card}>
                    <CardHeader
                        avatar={<Avatar src={data.url} />}
                        title={data.parameters.name}
                        subheader={data.startDate.replace('T', ' ')}
                        onClick={openDialog}
                    />
                    <CardContent className={classes.info} onClick={openDialog} >
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
                        onClick={deleteAcceptClick}
                    >
                        Delete Acception
                    </Button>
                </Card>
                :
                <Card style={{ width: '30%', margin: '5px' }}>
                    <CardHeader avatar={<Avatar src="" />} title="DELETED" />
                    <CardContent>
                        <Typography variant='h6' component='p'>This Route Deleted by Driver</Typography>
                    </CardContent>
                    <Button
                        variant='outlined'
                        fullWidth
                        onClick={deleteAcceptClick}
                    >
                        Delete Acception
                    </Button>
                </Card>
            }
            <Dialog open={open} onClose={closeDialog} aria-labelledby="form-dialog-title" fullScreen={false}>
                <DialogTitle id="form-dialog-title">Map</DialogTitle>
                <DialogContent>
                    <div className={classes.map}>
                        <Map route={data}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} variant='outlined' className={classes.cancelButton}>
                    Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Passenger;