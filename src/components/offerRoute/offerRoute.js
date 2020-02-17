import React, { useState } from 'react';
import { Button, TextField, MenuItem, Grid } from '@material-ui/core';
import SimpleSnackbar from "./snackbar/snackbar";
import SimpleSnackbarSuccess from "./snackbar/snackbarSuccess";
import MLeafletApp from './Leafletmaps/final';
import fire from '../../ConfigFirebase/Fire';
import {Redirect} from 'react-router-dom';
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

const OfferRout = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [car, setCar] = useState("");
    const [plate, setPlate] = useState("");
    const [count, setCount] = useState("1");
    const [price, setPrice] = useState(0);
    const [defaultPrice, setDefaultPrice] = useState(0);
    const [startDateError, setStartDateError] = useState(false);
    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);
    const [carError, setCarError] = useState(false);
    const [plateError, setPlateError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isRouteError, setIsRouteError] = useState(null);
    const [isRouteSuccess, setIsRouteSuccess] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(false);
    const [priceHelperText, setPriceHelperText] = useState('');
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
            let currentRoute = JSON.parse(localStorage.getItem("route"));
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
                    price: `${Math.ceil(price/count)}AMD`,
                }
            };
            routeInfo_REF.add(route).then(() => setRedirect(true));
        });
    }

    let d = new Date();
    let day;
    let month;
    if (d.getDate() < 10) {
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
    let date = `${year}-${month}-${day}T23:59`;
    const [startDate, setStartDate] = useState(date);

    function isEmpty() {
        if (from.trim() !== '' && to.trim() !== '' && car.trim() !== '' && plate.trim() !== '' && +price && !priceError && startDate !== null && startDate !== date && !isRouteError && isRouteError !== null) {
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
            if (+price <= defaultPrice && +price > 0) {
                console.log('AWD');
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
            <Grid
                container
                alignItems='center'
                justify='space-between'
                className={classes.offer}
            >
                <Grid
                    item
                    xs={5}
                    className={classes.rideList}
                >
                    <TextField
                        margin='dense'
                        fullWidth
                        disabled
                        variant='outlined'
                        label='From'
                        onChange={(e) => {setFrom(e.target.value)}}
                        value={from}
                        error={fromError}
                        helperText={fromError ? 'You  must fill blank areas' : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        disabled
                        variant='outlined'
                        label='To'
                        onChange={(e) => { setTo(e.target.value) }}
                        value={to}
                        error={toError}
                        helperText={toError ? 'You  must fill blank areas' : null}
                        className={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='To'
                        style={{display: 'none'}}
                        id={'input12'}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        error={startDateError}
                        helperText={startDateError ? 'You must set correct Date. You can set Trip Date starting tomorrow' : null}
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
                        helperText={carError ? 'You  must fill blank areas' : null}
                        className={classes.rideListItem}
                        inputProps={{
                            maxLength: 25,
                        }}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car plate'
                        onChange={(e) => { setPlate(e.target.value) }}
                        value={plate}
                        error={plateError}
                        helperText={plateError ? 'You  must fill blank areas' : null}
                        className={classes.rideListItem}
                        inputProps={{
                            maxLength: 7,
                        }}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Price per Person'
                        value={boolean ? price : (Math.ceil(defaultPrice/count)===NaN||Math.ceil(defaultPrice/count)===Infinity ? 200 : Math.ceil(defaultPrice/count))}
                        error={priceError}
                        inputProps={{
                            maxLength: 5,
                        }}
                        helperText={priceError ? priceHelperText : null}
                        onChange={(e) => {
                            setboolean(true)
                            setPrice(e.target.value)
                            if (+e.target.value > defaultPrice/count) {
                                setPriceError(true);
                                setPriceHelperText(`The possible maximum price per person for this ride is ${Math.ceil(defaultPrice/count)}AMD`)
                            } else if (e.target.value.trim() === '') {
                                setPriceError(true);
                                setPriceHelperText("You must fill blank areas");
                            } else if (typeof (+e.target.value) === "number" && e.target.value > 0) {
                                setPriceError(false);
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
                </Grid>
                <Grid
                    item
                    xs={5}
                    className={classes.mapContainer}
                >
                    {isRouteError ? <SimpleSnackbar isRouteError={isRouteError} /> : null}
                    {isRouteSuccess ? <SimpleSnackbarSuccess isSuccess={isRouteSuccess} text='SUCCESS Routes Found'/> : null}
                    <MLeafletApp
                        setboolean={setboolean}
                        setDefaultPrice={setDefaultPrice}
                        setPrice={setPrice}
                        setFrom={setFrom}
                        setTo={setTo}
                        setIsRouteSuccess={setIsRouteSuccess}
                        setIsRouteError={setIsRouteError}
                    />
                </Grid>
            </Grid>
        </section>
    );
}

export default OfferRout;