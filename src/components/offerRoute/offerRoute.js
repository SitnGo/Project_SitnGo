import React, { useState } from 'react';
import {classes} from "./style";
import {Button, TextField, MenuItem} from '@material-ui/core';
import MLeafletApp from './Leafletmaps/final'

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
    const [carModel, setCarModel] = useState("");
    const [carPlate, setCarPlate] = useState("");

    const [fromError, setFromError] = useState(false);
    const [toError, setToError] = useState(false);
    const [carModelError, setCarModelError] = useState(false);
    const [carPlateError, setCarPlateError] = useState(false);
    
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

   function isEmpty () {
       if(from.trim() !== '' && to.trim() !== '' && carModel.trim() !== '' && carPlate.trim() !== '') {
    //        alert("confirm");

           setFromError(false);
           setToError(false);
           setCarModelError(false);
           setCarPlateError(false);
           setFrom('');
           setTo('');
           setCarModel('');
           setCarPlate('');

           // firebase
       } else {
                
        if (from.trim() !== '') {
            setFromError(false);
        } else {
            setFromError(true);
        }

        if (to.trim() !== '') {
            setToError(false);
        } else {
            setToError(true);
        }

        if (carModel.trim() !== '') {
            setCarModelError(false);
        } else  { 
            setCarModelError(true);
        }

        if (carPlate.trim() !== '') {
            setCarPlateError(false);
        } else {
            setCarPlateError(true);
        }

    }



   }
    return(
        <section style={classes.section}>
            <div style={classes.offer}>
                <div style={classes.rideList}>
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='From'
                        onChange={(e)=>{setFrom(e.target.value)}}
                        value={from}
                        error={fromError}
                        helperText={fromError ? <p>You  must fill blank areas</p> : null}
                        style={classes.rideListItem}
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
                        select
                        fullWidth
                        variant='outlined'
                        label='Persons'
                        style={classes.rideListItem}
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
                        onChange={(e)=>{setCarModel(e.target.value)}}
                        value={carModel}
                        error={carModelError}
                        helperText={carModelError ? <p>You  must fill blank areas</p> : null}
                        style={classes.rideListItem}
                    />
                    <TextField
                        margin='dense'
                        fullWidth
                        variant='outlined'
                        label='Car plate'
                        onChange={(e)=>{setCarPlate(e.target.value)}}
                        value={carPlate}
                        error={carPlateError}
                        helperText={carPlateError ? <p>You  must fill blank areas</p> : null}
                        style={classes.rideListItem}
                    />
                    <Button
                        onClick={isEmpty}
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