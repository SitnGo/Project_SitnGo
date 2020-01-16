import React, {useState}from 'react';
import {classes} from "./style";
import {TextField, Table, TableRow, TableHead, TableBody, TableCell, TableFooter, TablePagination, Button} from '@material-ui/core';
// import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
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
            <div style={classes.routeList}>
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='From'
                    onChange={(e)=>{setState({from: e.target.value})}}
                    error = {errors.from}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='To'
                    onChange={(e)=>{setState({to: e.target.value})}}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Date'
                    type='datetime-local'
                    onChange={(e)=>{setState({startDate: e.target.value})}}
                    defaultValue={`${date}`}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Persons'
                    onChange={(e)=>{setState({maxPersons: e.target.value})}}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Car Model'
                    onChange={(e)=>{setState({carModel: e.target.value})}}
                    style={classes.routeListItem}
                />
                <TextField
                    margin='dense'
                    variant='outlined'
                    label='Car plate'
                    onChange={(e)=>{setState({carPlate: e.target.value})}}
                    style={classes.routeListItem}
                />
                <Button onClick={onSubmitClick}>Submit</Button>
            </div>
            <MLeafletApp/>
        </section>
    );
}

export default OfferRout;