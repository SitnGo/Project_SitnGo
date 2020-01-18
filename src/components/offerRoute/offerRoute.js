import React from 'react';
import {classes} from "./style";
import {Button, TextField} from '@material-ui/core';
import MLeafletApp from './Leafletmaps/final'

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
            <div style={classes.offer}>
                <div style={classes.rideList}>
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='From'
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='To'
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Date'
                        type='datetime-local'
                        defaultValue={`${date}`}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Persons'
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car Model'
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car plate'
                        style={classes.rideListItem}
                    />
                    <Button
                        style={classes.rideListItem}
                        variant='outlined'
                        fullWidth
                    >Submit</Button>
                </div>
                <div style={classes.mapContainer}>
                    <MLeafletApp />
                </div>
            </div>
        </section>
    );
}

export default OfferRout;