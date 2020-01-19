import React, {useState}from 'react';
import {classes} from './style';
import {Button, TextField} from '@material-ui/core';
import MLeafletApp from './Leafletmaps/final'
import fire from '../../ConfigFirebase/Fire';


const OfferRout = () => {
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [startDate,setStartDate] = useState("");
    const [car, setCar] = useState("");
    const [plate, setPlate] = useState("");
    const [count, setCount] = useState("")
    const [errors, setErrors] = useState({
        from: false,
        to: false,
        startDate: false,
        maxPersons: false,
        carModel: false,
        carPlate: false,
    })
    // const [state,setState] = useState({
    //     from: "",
    //     to: "",
    //     startDate: "",
    //     maxPersons: "",
    //     carModel: "",
    //     carPlate: "",
    // })
    const [route, setRoute] = useState(null);
 let i=0;
   function onSubmitClick(){
    async function getMarker(user={}) {
        let userId;
        if (localStorage.getItem("userId")){
            userId = localStorage.getItem("userId")                
        }else{
            userId = fire.auth().currentUser.uid;
        }
        user = await fire.firestore().collection("users").doc(userId).get()
            user = user.data();
        return user;
    }
    getMarker().then(result => {
        if(!result.hasOwnProperty("userRoutesInfo")){
            result.userRoutesInfo = {}
            result.userRoutesInfo.routes = []
        }
        if(!result.userRoutesInfo.hasOwnProperty("routes")){
            result.userRoutesInfo.routes = []
        }
        let currentRoute = JSON.parse(localStorage.getItem("route"))
        currentRoute.waypoints[0].name += from;
        currentRoute.waypoints[1].name += to;
        let route={
            route: currentRoute,
            parameters:  {
                name: `${result.userInfo.name} ${result.userInfo.surname}`, 
                car: car, 
                plate: plate, 
                count: count,
            }
        }
        result.userRoutesInfo.routes.push(route)
      fire.firestore().collection("users").doc(result.userId).set(JSON.parse(JSON.stringify(result)))

    });
 

}

   

    let d = new Date();
    let day = d.getDate();
    let month;
    if (d.getMonth()<9){
        month = `0${d.getMonth()+1}`;
    }else{
        month = d.getMonth()+1;
    }
    let year = d.getFullYear();
    let date = `${year}-${month}-${day}T23:59`;

    return(
        <section style={classes.section}>
            <div style={classes.offer}>
                <div style={classes.rideList}>
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='From'
                        onChange={(e)=>setFrom(e.target.value)}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='To'
                        onChange={(e)=>setTo(e.target.value)}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Date'
                        type='datetime-local'
                        defaultValue={`${date}`}
                        onChange={(e)=>setStartDate(e.target.value)}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Persons'
                        onChange={(e)=>setCount(e.target.value)}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car Model'
                        onChange={(e)=>setCar(e.target.value)}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car plate'
                        onChange={(e)=>setPlate(e.target.value)}
                        style={classes.rideListItem}
                    />
                    <Button
                        style={classes.rideListItem}
                        variant='outlined'
                        fullWidth
                        onClick={onSubmitClick}
                    >Submit</Button>
                </div>
                <div style={classes.mapContainer}>
                    <MLeafletApp route={route} setRoute={setRoute} />
                </div>
            </div>
        </section>
    );
}

export default OfferRout;