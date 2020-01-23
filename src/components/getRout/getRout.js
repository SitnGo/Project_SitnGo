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
} from '@material-ui/core';
import fire from '../../ConfigFirebase/Fire';
import Map from './map/MapForGetRoute'
import {Redirect} from 'react-router-dom';
import styles from './style';

const GetRout = (props) => {
    const [mapId, setMapId] = useState(1);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [routeFromTo, setRouteFromTo] = useState('');
    const [routeDate, setRouteDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [count, setCount] = useState('')
    const [route, setRoute] = useState('');
    const [load, setLoad] = useState(false);
    const [countError, setCountError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isDisable, setIsDisable] =useState(false);


    const handleClick = (id) => {
        setMapId(id);
    }
    useEffect((() => {
        onSubmit();
        setIsDisable(false)
    }), [])
    
    // function compareDates(string, d=new Date()){
    //     let day = d.getDate();
    // let month;
    // if (d.getMonth()<9){
    //     month = `0${d.getMonth()+1}`;
    // }else{
    //     month = d.getMonth()+1;
    // }
    // let hours= d.getHours();
    // let minutes = d.getMinutes();
    // let year = d.getFullYear();
    // let date =`${year}-${month}-${day}T${hours}:${minutes}`;

    // let dateArr = date.split('-');
    // let stringArr = string.split('-');
    // if(+dateArr[0]<+stringArr[0]){
    //     return false;
    // }else if((+dateArr[0] == +stringArr[0]) && (+dateArr[1]<+stringArr[1])){

    // }

    // }

    function onSubmit() {
        setPage(0);
        let userId;
        async function getMarker(user = {}) {
            if (localStorage.getItem('userId')) {
                userId = localStorage.getItem('userId')
            } else {
                userId = fire.auth().currentUser.uid;
            }
            user = await fire.firestore().collection('users').get().then((result) => {
                let matchedRouts = [];
                result.forEach((item => {
                    if (item.data().hasOwnProperty('userRoutesInfo')) {
                        if (item.data().userRoutesInfo.hasOwnProperty('routes')) {
                            item.data().userRoutesInfo.routes.forEach((item) => {
                                console.log(item.startDate)
                                if ((Date.parse(item.startDate)>new Date().getTime()) && (item.userId !== fire.auth().currentUser.uid && item.route.waypoints[0].name.toUpperCase().includes(from.toUpperCase())) && (item.route.waypoints[1].name.toUpperCase().includes(to.toUpperCase()))) {
                                    matchedRouts.push(item)
                                    // item.startDate < new Date().getTime() &&
                                }
                            })
                        }
                    }
                }));
                setInfo(matchedRouts);
            });
            return user;
        }
        getMarker().then(result => {
        })
    };

    function onAcceptClick() {
        setIsDisable(true);

        fire.firestore().collection('users').doc(route.userId).get().then(result => {
            return result.data()
        }).then((result) => {
            // console.log(result);
            result.userRoutesInfo.routes.forEach((item) => {
                if (JSON.stringify(item) === JSON.stringify(route)) {
                    // console.log(item)
                    if(item.parameters.count == 0){
                        return 0;
                    }
                    if (typeof (item.parameters.count) !== 'number') {
                        item.parameters.count = +item.parameters.count;
                    }
                    item.parameters.count -= 1;
                    fire.firestore().collection('users').doc(fire.auth().currentUser.uid).get().then((result)=>{
                        let currentUser = result.data()
                        if(!currentUser.hasOwnProperty('acceptedRoutes')){
                            currentUser.acceptedRoutes = [];
                        }
                        currentUser.acceptedRoutes.push(item);
                        return currentUser
                    }).then((updatedUser)=>{
                        // console.log(updatedUser);
                        fire.firestore().collection('users').doc(fire.auth().currentUser.uid).set(updatedUser)
                    })
                } else {
                    setCountError(true);
                }
            });
            return result;
        }).then((resultWithUpdatedCount) => {
            if(resultWithUpdatedCount == 0){
                return
            }
            // console.log(resultWithUpdatedCount)
            fire.firestore().collection('users').doc(route.userId).set(resultWithUpdatedCount).then(()=>{
                setRedirect(true);
            })
            // onSubmit();
            // props.history.push('/profile')
        })
    }

    function onTableRowClick(e) {
        setRoute(e);
        console.log(e)
        if(e.astartEnd){
            setRouteFromTo(e.astartEnd);
            setRouteDate(e.startDate)
            // setDriverPhone(e.DriverPhone)
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
    let date = `${year}-${month}-${day}T23:59`;

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
            <div className={classes.routeList}>
                {redirect ? <Redirect to='/profile' push /> : null }
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='From'
                    onChange={(e) => { setFrom(e.target.value) }}
                    className={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='To'
                    onChange={(e) => { setTo(e.target.value) }}
                    className={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Date'
                    type='datetime-local'
                    defaultValue={`${date}`}
                    onChange={(e) => setStartDate(e.target.value)}
                    className={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Persons'
                    onChange={(e) => setCount(e.target.value)}
                    className={classes.routeListItem}
                />
                <Button
                    variant='outlined'
                    onClick={onSubmit}
                >Search</Button>
            </div>
            <div className={classes.offersContainer}>
                {info ? <div className={classes.offers}>
                    <Paper>
                        <Table size='small' stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Car Model</TableCell>
                                    <TableCell align='center'>Total Sits</TableCell>
                                    <TableCell align='center'>Distance</TableCell>
                                    <TableCell align='center'>Driver</TableCell>
                                    <TableCell align='center'>Car plate</TableCell>
                                    <TableCell align='center'>Price</TableCell>
                                    <TableCell align='center'>Duration</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    //edit i to id from firebase
                                    let i = 0;
                                    i++;
                                    // console.log(row)
                                    // delete row.parameters.userId
                                    let tableRow = Object.values(row.parameters);
                                    return (
                                        <TableRow hover role='checkbox' key={row.i} onClick={() => onTableRowClick(row)} >
                                            {
                                                tableRow.map(column => {
                                                    return (
                                                        <TableCell key={column.i} align='center' >
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
                        <React.Fragment className={classes.mapView}>
                            <Typography align='center' >{routeFromTo} </Typography>
                            <Typography align='center'>{routeDate} </Typography>
                            <Map route={route} />
                            <Button
                                fullWidth
                                disabled = {isDisable}
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
        </section>
    );
}

export default GetRout;