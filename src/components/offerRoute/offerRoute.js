import React, {useState}from 'react';
import {classes} from "./style";
import {Button, TextField} from '@material-ui/core';
import MLeafletApp from './Leafletmaps/final'

const OfferRout = () => {
    // const [from,setFrom] = useState("");
    // const [to,setTo] = useState("");
    // const [startDate,setStartDate] = useState("");
    // const [maxPersons, setMaxPersons] = useState("");
    // const [carModel, setCarModel] = useState("");
    // const [carPlate, setCarPlate] = useState("");
    const [errors, setErrors] = useState({
        from: false,
        to: false,
        startDate: false,
        maxPersons: false,
        carModel: false,
        carPlate: false,
    })
    const [state,setState] = useState({
        from: "",
        to: "",
        startDate: "",
        maxPersons: "",
        carModel: "",
        carPlate: "",
    })
    const [route, setRoute] = useState(null);

   function onSubmitClick(){
        let keys=Object.entries(state);

       keys.forEach(element => {
        if(element[1]) {
            let errorF={};
            errorF[element[0]] = false;
            setErrors(Object.assign(errors, errorF))
           }else{
            let errorT = {};
            errorT[element[0]] = true;
            console.log(errorT)
            setErrors(Object.assign(errors, errorT))
           }    

    });
    console.log(errors)
    // console.log(state);
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