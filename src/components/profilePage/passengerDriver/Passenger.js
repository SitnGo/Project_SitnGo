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
import { useDispatch, /*useSelector, connect*/ } from 'react-redux';

function Passenger(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
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
                        subheader={data.startDate}
                        onClick={openDialog}
                    />
                    <CardContent onClick={openDialog}>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >from - {startEnd[0]}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >to - {startEnd[1]}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >Current Free Seats - {data.parameters.count}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >distance - {data.parameters.distance}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >car model - {data.parameters.car}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >car number - {data.parameters.plate}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
                            component='p'
                        >price - {data.parameters.price}</Typography>
                        <Typography
                            align ='center'
                            variant='body2'
                            color='textSecondary'
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
            <Dialog open={open} onClose={closeDialog} >
                <DialogTitle id="form-dialog-title">Map</DialogTitle>
                <DialogContent>
                    <div className={classes.map}>
                        <Map route={data}/>
                    </div>
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

export default Passenger;