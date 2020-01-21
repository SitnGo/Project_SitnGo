import React, { useState, useEffect } from 'react';
import { classes } from './style';
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
// import MLeafletApp from '../offerRoute/Leafletmaps/final'
import Map from './map/MapForGetRoute'
import {Redirect} from 'react-router-dom';



const GetRout = (props) => {
    const [mapId, setMapId] = useState(1);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [routeFromTo, setRouteFromTo] = useState("");
    const [routeDate, setRouteDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [count, setCount] = useState("")
    const [route, setRoute] = useState("");
    const [load, setLoad] = useState(false);
    const [countError, setCountError] = useState(false);
    const [redirect, setRedirect] = useState(false);


    const handleClick = (id) => {
        setMapId(id);
    }

    useEffect((() => {
        onSubmit();
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

    // let dateArr = date.split("-");
    // let stringArr = string.split("-");
    // if(+dateArr[0]<+stringArr[0]){
    //     return false;
    // }else if((+dateArr[0] == +stringArr[0]) && (+dateArr[1]<+stringArr[1])){
        
    // }

    // }


    function onSubmit() {
        setPage(0);
        let userId;
        async function getMarker(user = {}) {
            if (localStorage.getItem("userId")) {
                userId = localStorage.getItem("userId")
            } else {
                userId = fire.auth().currentUser.uid;
            }
            user = await fire.firestore().collection("users").get().then((result) => {
                let matchedRouts = [];
                result.forEach((item => {
                    if (item.data().hasOwnProperty("userRoutesInfo")) {

                        if (item.data().userRoutesInfo.hasOwnProperty("routes")) {
                            item.data().userRoutesInfo.routes.forEach((item) => {
                                console.log(item.startDate)
                                if ((Date.parse(item.startDate)>new Date().getTime()) && (item.userId !== fire.auth().currentUser.uid && item.route.waypoints[0].name.toUpperCase().includes(from.toUpperCase())) && (item.route.waypoints[1].name.toUpperCase().includes(to.toUpperCase()))) {
                                    matchedRouts.push(item)
                                    // item.startDate < new Date().getTime() && 
                                }
                            })
                        }
                    }
                }))
                setInfo(matchedRouts)


            })
            return user;
        }
        getMarker().then(result => {
        })
    }

    function onAcceptClick() {
        // console.log(route)

        fire.firestore().collection("users").doc(route.userId).get().then(result => {
            // console.log(result.data())
            return result.data()
        }).then((result) => {
                result.userRoutesInfo.routes.forEach((item) => {
                    if (JSON.stringify(item) === JSON.stringify(route)) {
                        console.log(item)
                       
                        
                        if(item.parameters.count == 0){
                            return 0;
                        }
                        if (typeof (item.parameters.count) !== "number") {
                            item.parameters.count = +item.parameters.count;
                        }
                        item.parameters.count -= 1;
                        fire.firestore().collection("users").doc(localStorage.getItem("userId")).get().then((result)=>{
                           let currentUser = result.data()
                           if(!currentUser.hasOwnProperty("acceptedRoutes")){
                            currentUser.acceptedRoutes = [];
                           }
                           currentUser.acceptedRoutes.push(item);
                           return currentUser
                        }).then((updatedUser)=>{
                            fire.firestore().collection("users").doc(localStorage.getItem("userId")).set(updatedUser)
                        })
                    } else {
                        setCountError(true);
                    }
                })
            return result;
        }).then((resultWithUpdatedCount) => {
            if(resultWithUpdatedCount == 0){
                return
            }
            // console.log(resultWithUpdatedCount)
            fire.firestore().collection("users").doc(route.userId).set(resultWithUpdatedCount).then(()=>{
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
    // for(let i=0; i<info.length; i++){
    // rows.push(info[i])
    // }
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <section style={classes.section}>
            <div style={classes.routeList}>
            {redirect ? <Redirect to="/profile" push /> : null }
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='From'
                    onChange={(e) => { setFrom(e.target.value) }}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='To'
                    onChange={(e) => { setTo(e.target.value) }}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Date'
                    type='datetime-local'
                    defaultValue={`${date}`}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Persons'
                    onChange={(e) => setCount(e.target.value)}
                    style={classes.routeListItem}
                />
                <Button
                    variant='outlined'
                    onClick={onSubmit}
                >Search</Button>
            </div>
            <div style={classes.offersContainer}>
                {info ? <div style={classes.offers}>
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
                <div style={classes.mapContainer}>
                    {route ?
                        <React.Fragment style={classes.mapView}>
                            <Typography align="center" >{routeFromTo} </Typography>
                            <Typography align="center">{routeDate} </Typography>
                            <Map route={route} />
                            <Button
                                fullWidth
                                variant='outlined'
                                style={classes.accept}
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