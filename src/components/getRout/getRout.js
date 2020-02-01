import React, { useState, useEffect } from 'react';
import {
    TextField,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
    TablePagination,
    Paper,
    Button,
    Typography,
    Grid,
} from '@material-ui/core';
import fire from '../../ConfigFirebase/Fire';
import Map from './map/MapForGetRoute'
import { Redirect } from 'react-router-dom';
import styles from './style';
import SimpleSnackbar from "./snackbar/snackbar"

const GetRout = (props) => {

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [routeFromTo, setRouteFromTo] = useState('');
    const [routeDate, setRouteDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [count, setCount] = useState('')
    const [route, setRoute] = useState('');
    const [routeRef, setRouteRef] = useState('');
    const [countError, setCountError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [checkIsUserAlreadyHasRoute, setCheckIsUserAlreadyHasRoute] = useState(null)
    const [matchedRef, setMatchedRef] = useState(null);
    const [alreadyAcceptedRoute, setAlreadyAcceptedRoute] = useState(null);
    let i = 0;
    let j = 0;

    useEffect((() => {
        onSubmit();
        setIsDisable(false)
    }), [])
    function onSubmit() {
        setPage(0);
        async function getMarker(user = {}) {
            user = await fire.firestore().collectionGroup('userRoutesInfo').get().then((result) => {
                let matchedRouts = [];
                let matchedRoutsRefs = [];
                result.forEach(itemRef => {
                    let item = itemRef.data();
                    item.ref = itemRef;
                    if ((item.parameters.count > 0) && (Date.parse(item.startDate) > new Date().getTime()) && (item.userId !== fire.auth().currentUser.uid && item.route && item.route.waypoints[0].name.toUpperCase().includes(from.toUpperCase())) && (item.route.waypoints[1].name.toUpperCase().includes(to.toUpperCase()))) {
                        matchedRouts.push(item)
                        matchedRoutsRefs.push(itemRef);
                    }
                })
                setInfo(matchedRouts);
                setMatchedRef(matchedRoutsRefs);
            });
            return user;
        }

        getMarker().then(result => {
        })
    };

    function onAcceptClick() {
        setIsDisable(true);
        fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("acceptedRoutes").get().then((res) => {
            let bool = false;
            res.forEach((item) => {
                if (item.data().ref.isEqual(fire.firestore().doc(routeRef.ref.path))) {
                    setAlreadyAcceptedRoute(true);
                    bool = true;
                    setTimeout(()=>{
                        setIsDisable(false);
                        setAlreadyAcceptedRoute(false);
                    },3000)
                }
                
            })
            return bool;
        }).then((res)=>{
            if(!res){
                
                let { parameters } = route;
                    fire.firestore().doc(routeRef.ref.path)
                        .set({ parameters: { ...parameters, count: parameters.count - 1 } }, { merge: true }).then(() => {
                            // console.log(JSON.stringify(routeRef))
                            fire.firestore().collection("users").doc(fire.auth().currentUser.uid).collection("acceptedRoutes").add({ ref: fire.firestore().doc(routeRef.ref.path) })
                                .then(() => setRedirect(true))
                        })
            }
        })
    }

    function onTableRowClick(e) {
        setRoute(e);
        setRouteRef(e.ref)
        if (e.astartEnd) {
            setRouteFromTo(e.astartEnd);
            setRouteDate(e.startDate)
        }
    }

    let d = new Date();
    let day = d.getDate();
    let month;
    if (d.getMonth() < 9) {
        month = `0${d.getMonth() + 1}`;
    } else {
        month = d.getMonth() + 1;
    }
    let year = d.getFullYear();
    let date = `${year}-${month}-${day}T23:59:00`;

    const [page, setPage] = React.useState(0);
    const [info, setInfo] = useState(false);
    const rows = Object.values(info);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const classes = styles();
    return (
        <section className={classes.section}>
            <Grid
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={classes.routeList}
            >
                {redirect ? <Redirect to='/profile' push /> : null}
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='From'
                    onChange={(e) => { setFrom(e.target.value) }}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='To'
                    onChange={(e) => { setTo(e.target.value) }}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Date'
                    type='datetime-local'
                    defaultValue={`${date}`}
                    onChange={(e) => setStartDate(e.target.value + ":00")}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Persons'
                    onChange={(e) => setCount(e.target.value)}
                    InputProps={{
                        classes: {
                            input: classes.resize,
                        },
                    }}
                    className={classes.routeListItem}
                />
                <Button
                    variant='outlined'
                    onClick={onSubmit}
                    className={classes.search}
                >Search</Button>
            </Grid>
            <div className={classes.offersContainer}>
                {info ? <div className={classes.offers}>
                    <Paper>
                        <Table size='small' stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Car Model</TableCell>
                                    <TableCell align='center'>Total Seats</TableCell>
                                    <TableCell align='center'>Distance</TableCell>
                                    <TableCell align='center'>Driver</TableCell>
                                    <TableCell align='center'>Car plate</TableCell>
                                    <TableCell align='center'>Price</TableCell>
                                    <TableCell align='center'>Duration</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    i++;
                                    let tableRow = Object.values(row.parameters);
                                    return (
                                        <TableRow hover role='checkbox' key={i} onClick={() => onTableRowClick(row)} >
                                            {
                                                tableRow.map(column => {
                                                    j++;
                                                    return (
                                                        <TableCell key={j} align='center' >
                                                            {column}
                                                        </TableCell>
                                                    );
                                                })

                                            }

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TablePagination
                                    count={rows.length}
                                    rowsPerPageOptions={[]}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                />
                            </TableFooter>
                        </Table>
                    </Paper>
                </div> : null}
                <div className={classes.mapContainer}>
                    {route ?
                        <React.Fragment >
                            <Typography 
                                align ='justify'
                                variant='overline'
                                component='p' 
                            >{routeFromTo} </Typography>
                            <Typography
                                align ='justify'
                                variant='overline'
                                component='p'
                            >{routeDate} </Typography>
                            <Map route={route} />
                            <Button
                                fullWidth
                                disabled={isDisable}
                                variant='outlined'
                                className={classes.accept}
                                onClick={onAcceptClick}
                            >
                                Accept
                            </Button>
                        </React.Fragment>
                        : null
                    }
                </div>
            </div>
            {alreadyAcceptedRoute ? <SimpleSnackbar alreadyAcceptedRoute={alreadyAcceptedRoute}/> : null}
        </section>
    );
}

export default GetRout;