import React from 'react';
import {classes} from "./style";
import {TextField, Table, TableRow, TableHead, TableBody, TableCell, TableFooter, TablePagination} from '@material-ui/core';
// import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import MLeafletApp from './Leafletmaps/final';
import Routing from './Leafletmaps/RoutingMachine';


const OfferRout = () => {
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
            <div style={classes.routeList}>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='From'
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='To'
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Date'
                    type='datetime-local'
                    defaultValue={`${date}`}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Persons'
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Car Model'
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Car plate'
                    style={classes.routeListItem}
                />
            </div>
            <MLeafletApp/>
            {/* <Routing/> */}
        </section>
    );
}

export default OfferRout;