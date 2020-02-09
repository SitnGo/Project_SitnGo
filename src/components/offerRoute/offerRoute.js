import React, { useState } from 'react';
import { Button, TextField, MenuItem } from '@material-ui/core';
import SimpleSnackbar from "./snackbar/snackbar"
import SimpleSnackbarSuccess from "./snackbar/snackbarSuccess"
import MLeafletApp from './Leafletmaps/final'
import fire from '../../ConfigFirebase/Fire';
import {Redirect} from 'react-router-dom';
// import Routing from './Leafletmaps/RoutingMachine';
// import {test} from "./Leafletmaps/Map";
import styles from './style';

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

const OfferRout = (props) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [car, setCar] = useState("");
    const [plate, setPlate] = useState("");
    const [count, setCount] = useState("1");
    const [maps, setMap] = useState();
    const [price, setPrice] = useState(0);
    const [defaultPrice, setDefaultPrice] = useState(0);
    
    const [startDateError, setStartDateError] = useState(false);
    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);
    const [carError, setCarError] = useState(false);
    const [plateError, setPlateError] = useState(false);
    const [priceError, setPriceError] = useState(true);
    const [redirect, setRedirect] = useState(false);
    const [isRouteError, setIsRouteError] = useState(null);
    const [isRouteSuccess, setIsRouteSuccess] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(false);
    const [route, setRoute] = useState(null);
    const [priceHelperText, setPriceHelperText] = useState("You  must fill blank areas");
    const [boolean,setboolean] = useState(false);

    function onSubmitClick() {
        if (isEmpty()) { return }
        setSubmitDisable(true);

        async function getMarker(user = {}) {
            let userId = fire.auth().currentUser.uid;
            user = await fire.firestore().collection("users").doc(userId).get()
            user = user.data();
            console.log(user)
            return user;
        }

    getMarker().then((result)=>{
    let userId = fire.auth().currentUser.uid;
    let routeInfo_REF = fire.firestore().collection("users").doc(userId).collection("userRoutesInfo");
    let currentRoute = JSON.parse(localStorage.getItem("route"))
        setRoute(currentRoute)
        currentRoute.waypoints[0].name += from;
        currentRoute.waypoints[1].name += to;
        let route={
            userId: fire.auth().currentUser.uid,
            url: result.url,
            route: currentRoute,
            astartEnd: `${from}-${to}`,
            startDate: startDate,
            DriverPhone: result.phone,
            parameters:  {
                name: `${result.name} ${result.surname}`, 
                car: car, 
                plate: plate, 
                count: count,
                distance: `${Math.ceil(currentRoute.route.summary.totalDistance/1000)}km`,
                time: `${Math.ceil(currentRoute.route.summary.totalTime/60)}min`,
                price: `${Math.floor(price/count)}AMD`,
            }
        }
            routeInfo_REF.add(route).then(() => setRedirect(true));
        })

}

    let d = new Date();
    let day = d.getDate();
    let month;
    if (d.getDate() < 9) {
        day = `0${d.getDate() }`;
    } else {
        day = d.getDate();
    }
    if (d.getMonth() < 9) {
        month = `0${d.getMonth() + 1}`;
    } else {
        month = d.getMonth() + 1;
    }
    let year = d.getFullYear();
    let date = `${year}-${month}-${day}T23:59:00`;
    const [startDate, setStartDate] = useState(date);

    function isEmpty() {
        if (from.trim() !== '' && to.trim() !== '' && car.trim() !== '' && plate.trim() !== '' && +price && !priceError && startDate !== null && startDate !== date && !isRouteError && isRouteError !== null) {
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
            if ((isRouteError || isRouteError == null) || (!isRouteSuccess)) {
                setSubmitDisable(true);
                setTimeout(() => {
                    setSubmitDisable(false)
                    setIsRouteError(null)
                }, 3000)
                setIsRouteError(true)

                return true
            }
            if (from.trim() !== '') {
                setFromError(false);
            } else {
                setFromError(true);
                return true
            }
            if (startDate && Date.parse(startDate) > (Date.parse(date) + 86400000)) {
                setStartDateError(false);
            } else {
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
            } else {
                setCarError(true);
                return true
            }

            if (plate.trim() !== '') {
                setPlateError(false);
            } else {
                setPlateError(true);
                return true
            }
            if (+price) {
                setPriceError(false);
            } else {
                setPriceError(true);
                return true
            }

        }
    }
    const classes = styles();
    return (
        <section className={classes.section}>
            {redirect ? <Redirect to="/profile" push /> : null}
            <div className={classes.offer}>
                <div className={classes.rideList}>
                    <TextField
                        margin='dense'
                        fullWidth
                        disabled={true}
                        variant='outlined'
                        label='From'
                        onChange={(e) => {
                            setFrom(e.target.value)
                            let routingInput = document.getElementsByClassName("leaflet-routing-geocoder")
                            routingInput[0].children[0].value=e.target.value;
                            console.log(routingInput[0].children)
                            // document.getElementById("input11").appendChild(routingInput[0].children[0])
                            document.getElementById('input12').style.display='block'

                        }}
                        value={from}
                        error={fromError}
                        helperText={fromError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        disabled={true}
                        variant='outlined'
                        label='To'
                        onChange={(e) => { setTo(e.target.value) }}
                        value={to}
                        error={toError}
                        helperText={toError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='To'
                        // onChange={(e) => { setTo(e.target.value) }}
                        // value={to}
                        // error={toError}
                        // helperText={toError ? <p>You  must fill blank areas</p> : null}
                        // className={classes.rideListItem}
                        style={{display: 'none'}}    
                        id={'input12'}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        error={startDateError}
                        helperText={startDateError ? <p>You must set correct Date. You can set Trip Date starting tomorrow</p> : null}
                        type='datetime-local'
                        defaultValue={startDate}
                        onChange={(e) => {setStartDate(e.target.value)}}
                        className={classes.rideListItem}
                    />
                    <TextField
                        defaultValue={+'1'}
                        margin='dense'
                        select
                        fullWidth
                        variant='outlined'
                        label='Persons'
                        onChange={(e) => setCount(+e.target.value)}
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
                        onChange={(e) => { setCar(e.target.value) }}
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
                        onChange={(e) => { setPlate(e.target.value) }}
                        value={plate}
                        error={plateError}
                        helperText={plateError ? <p>You  must fill blank areas</p> : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        defaultValue={200}
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Price per Person'
                        value={boolean ? price : (Math.ceil(defaultPrice/count)==NaN||Math.ceil(defaultPrice/count)==Infinity ? 200 : Math.ceil(defaultPrice/count))}
                        error={priceError}
                        helperText={priceError ? <p>{priceHelperText}</p> : null}
                        onChange={(e) => {
                            setboolean(true)
                            setPrice(e.target.value)
                            if (+e.target.value > defaultPrice/count) {
                                setPriceError(true);
                                setPriceHelperText(`The possible maximum price per person for this ride is ${Math.ceil(defaultPrice/count)}AMD`)
                            } else if (typeof (+e.target.value) === "number" && e.target.value > 0) {
                                setPriceError(false);
                                setPriceHelperText("You  must fill blank areas")
                            }
                            return;
                        }}
                        className={classes.rideListItem}
                    />
                    <Button
                        disabled={submitDisable}
                        className={classes.rideListItem}
                        variant='outlined'
                        fullWidth
                        onClick={onSubmitClick}
                    >Submit</Button>
                </div>
                <div className={classes.mapContainer}>
                    {isRouteError ? <SimpleSnackbar isRouteError={isRouteError} /> : null}
                    {isRouteSuccess ? <SimpleSnackbarSuccess isRouteSuccess={isRouteSuccess} text='SUCCESS Routes Found'/> : null}
                    <MLeafletApp
                    setboolean={setboolean}
                        setMap={setMap}
                        setDefaultPrice={setDefaultPrice}
                        setPrice={setPrice}
                        setFrom={setFrom}
                        setTo={setTo}
                        setIsRouteSuccess={setIsRouteSuccess}
                        setIsRouteError={setIsRouteError}
                    />
                </div>
            </div>
        </section>
    );
}

export default OfferRout;