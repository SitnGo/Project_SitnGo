import React, {useState} from 'react';
import styles from './style';
import {Button, TextField, MenuItem} from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import SimpleSnackbar from "./snackbar/snackbar"
import SimpleSnackbarSuccess from "./snackbar/snackbarSuccess"
import MLeafletApp from './Leafletmaps/final'
import fire from '../../ConfigFirebase/Fire';
import Routing from "./Leafletmaps/RoutingMachine";
import {Redirect} from 'react-router-dom';

const numberPersons = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '7',
        label: '7',
    },
  ];
  
const OfferRout = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [car, setCar] = useState("");
    const [plate, setPlate] = useState("");
    const [count, setCount] = useState("");
    const [maps, setMap] = useState();
    const [price, setPrice] = useState(1000);
    const [isMapInit, setIsMapInit] =useState(false);
    const [errors, setErrors] = useState({
        from: false,
        to: false,
        startDate: false,
        maxPersons: false,
        carModel: false,
        carPlate: false,
    })
    const [startDate, setStartDate] = useState(null);
    const [startDateError, setStartDateError] = useState(false);
    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);
    const [carError, setCarError] = useState(false);
    const [plateError, setPlateError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isRouteError,setIsRouteError] = useState(null);
    const [isRouteSuccess, setIsRouteSuccess] = useState(false);
    const [submitDisable,setSubmitDisable] =useState(false);
    

    // const [state,setState] = useState({
    //     from: "",
    //     to: "",
    //     startDate: "",
    //     maxPersons: "",
    //     car: "",
    //     plate: "",
    // })
    const [route, setRoute] = useState(null);
 let i=0;
   function onSubmitClick(){
    if(isEmpty()){ return}
    setSubmitDisable(true);
    async function getMarker(user={}) {
            let userId = fire.auth().currentUser.uid;
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
        setRoute(currentRoute)
        setPrice(`${Math.ceil(currentRoute.route.summary.totalDistance/1000)}`)
        currentRoute.waypoints[0].name += from;
        currentRoute.waypoints[1].name += to;
        // console.log(currentRoute.route)
        console.log(result);
        let route={
            userId: fire.auth().currentUser.uid,
            route: currentRoute,
            astartEnd: `${from}-${to}`,
            startDate: startDate,
            DriverPhone: result.userInfo.phone,
            parameters:  {
                name: `${result.userInfo.name} ${result.userInfo.surname}`, 
                car: car, 
                plate: plate, 
                count: count,
                distance: `${Math.ceil(currentRoute.route.summary.totalDistance/1000)}km`,
                time: `${Math.ceil(currentRoute.route.summary.totalTime/60)}min`,
                price: `${price}AMD`,
            }
        }
        result.userRoutesInfo.routes.push(route)
      fire.firestore().collection("users").doc(result.userId).set(JSON.parse(JSON.stringify(result)))
      setRedirect(true);

    });
 

}

   
function getCurrentDate() {
    let d = new Date();
    let day = d.getDate();
    let month;
    if (d.getMonth()<9){
        month = `0${d.getMonth()+1}`;
    }else{
        month = d.getMonth()+1;
    }
    let ss = d.getSeconds();
    let hours= d.getHours();
    let minutes = d.getMinutes();
    let year = d.getFullYear();
    let date =`${year}-${month}-${day}T${hours}:${minutes}`;
    return date;
}




   function isEmpty () {
    let date =`${getCurrentDate()}:00`;
       if(from.trim() !== '' && to.trim() !== '' && car.trim() !== '' && plate.trim() !== ''&& price !== '' && startDate !==null && startDate !==date && !isRouteError && isRouteError !== null) {
    //        alert("confirm");

           setFromError(false);
           setToError(false);
           setStartDateError(false);
           setCarError(false);
           setPlateError(false);
           setFrom('');
           setTo('');
           setCar('');
           setPlate('');
        return false
       } else {
      if((isRouteError || isRouteError == null)||(!isRouteSuccess)){
            setSubmitDisable(true);
            setTimeout(()=>{
                setSubmitDisable(false)
                setIsRouteError(null)
              },3000)
              setIsRouteError(true)

            return true
        }
        if (from.trim() !== '') {
            setFromError(false);
        } else {
            setFromError(true);
            return true
        }
        if(startDate && Date.parse(startDate) > (Date.parse(date)+86400000)){
            setStartDateError(false);
        }else{
            setStartDateError(true);
            return true
        }

        if (to.trim() !== '') {
            setToError(false);
        } else {
            setToError(true);
            return true
        }

        if (car.trim() !== '') {
            setCarError(false);
        } else  { 
            setCarError(true);
            return true
        }

        if (plate.trim() !== '') {
            setPlateError(false);
        } else {
            setPlateError(true);
            return true
        }
        if (price !== '') {
            setPriceError(false);
        } else {
            setPriceError(true);
            return true
        }

    }



   }
   const classes = styles();
    return(
        <section className={classes.section}>
            {redirect ? <Redirect to="/profile" push /> : null }
            <div className={classes.offer}>
                <div className={classes.rideList}>
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='From'
                        onChange={(e)=>{setFrom(e.target.value)}}
                        value={from}
                        error={fromError}
                        helperText={fromError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='To'
                        onChange={(e)=>{setTo(e.target.value)}}
                        value={to}
                        error={toError}
                        helperText={toError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        // label='Date'
                        error={startDateError}
                        helperText={startDateError ? <p>You must set correct Date. You can set Trip Date starting tomorrow</p> : null}
                        type='datetime-local'
                        defaultValue={getCurrentDate()}
                        onChange={(e)=>{console.log(e.target.value);let date = e.target.value+":00"; setStartDate(date)}}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        select
                        fullWidth
                        variant='outlined'
                        label='Persons'
                        onChange={(e)=>setCount(e.target.value)}
                        className={classes.rideListItem}
                    >
                        {numberPersons.map(option => (
                             <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car Model'
                        onChange={(e)=>{setCar(e.target.value)}}
                        value={car}
                        error={carError}
                        helperText={carError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car plate'
                        onChange={(e)=>{setPlate(e.target.value)}}
                        value={plate}
                        error={plateError}
                        helperText={plateError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Price'
                        value={price}
                        error={priceError}
                        helperText={priceError ? <p>You  must fill blank areas</p> : null}
                        onChange={(e)=>setPrice(e.target.value)}
                        className={classes.rideListItem}
                    />
                    <Button
                        onClick={isEmpty}
                        disabled={submitDisable}
                        className={classes.rideListItem}
                        variant='outlined'
                        fullWidth
                        // onClick={onSubmitClick}
                    >Submit</Button>
                </div>
                <div className={classes.mapContainer}>
               {/* <SimpleSnackbar isRouteError={isRouteError} /> */}
                {isRouteError ? <SimpleSnackbar isRouteError={isRouteError} />  : null}
                {isRouteSuccess ? <SimpleSnackbarSuccess isRouteSuccess = {isRouteSuccess}/> : null}
                    {/* <SimpleSnackbar /> */}
                    
                    <MLeafletApp  setMap = {setMap} setIsRouteSuccess={setIsRouteSuccess} setIsRouteError={setIsRouteError} />
                    {/* {isMapInit && <Routing map={maps}/>} */}
                </div>
            </div>
        </section>
    );
}

export default OfferRout;